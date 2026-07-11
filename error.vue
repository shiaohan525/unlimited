<script setup>
// 全站錯誤頁：404 與其他錯誤分開文案，風格走極簡玩味
// 404 數字有物理互動：進頁掉落，游標／手指可以推著走（matter.js）
const props = defineProps({
    error: Object
})

const is404 = computed(() => props.error?.statusCode === 404)

const title = computed(() => (is404.value ? '404' : String(props.error?.statusCode || '500')))
const message = computed(() =>
    is404.value
        ? '這個頁面跟我的靈感一樣，暫時走丟了'
        : '伺服器打了個盹，請稍後再試'
)

// 錯誤頁不進索引
useSeoMeta({
    title: () => `${title.value}｜The Unlimited｜Hailey's Style`,
    robots: 'noindex'
})

const backHome = () => clearError({ redirect: '/' })

// --- 404 數字物理互動 ---
const mainRef = ref(null)
const codeRef = ref(null)
let cleanup = null

onMounted(async () => {
    // 尊重減少動態偏好：直接維持靜態排版
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!codeRef.value || !mainRef.value) return

    const spans = [...codeRef.value.querySelectorAll('.error-digit')]
    if (!spans.length) return

    const { Engine, Runner, Bodies, Body, Composite } = await import('matter-js')

    const container = mainRef.value
    const cRect = container.getBoundingClientRect()

    const engine = Engine.create()

    // 數字剛體：從原本排版位置開始受重力掉落
    const digits = spans.map((el) => {
        const r = el.getBoundingClientRect()
        const x0 = r.left - cRect.left + r.width / 2
        const y0 = r.top - cRect.top + r.height / 2
        const body = Bodies.rectangle(x0, y0, r.width, r.height, {
            restitution: 0.55, // 落地彈跳感
            friction: 0.2, // 低摩擦：落地後還會滑動翻滾
            frictionAir: 0.012,
            chamfer: { radius: 12 }
        })
        return { el, body, x0, y0 }
    })

    // 四面封閉：地板、天花板、左右牆，互動範圍就是眼前這塊畫面，數字不會彈出去
    const wallOpts = { isStatic: true }
    const bounds = [
        Bodies.rectangle(cRect.width / 2, cRect.height + 30, cRect.width + 400, 60, wallOpts),
        Bodies.rectangle(cRect.width / 2, -30, cRect.width + 400, 60, wallOpts),
        Bodies.rectangle(-30, cRect.height / 2, 60, cRect.height * 4, wallOpts),
        Bodies.rectangle(cRect.width + 30, cRect.height / 2, 60, cRect.height * 4, wallOpts)
    ]

    // 游標／手指＝隱形碰撞球，移動時把數字推開
    const cursor = Bodies.circle(-300, -300, 55, { isStatic: true })

    // 邊界與游標先進世界；數字延遲逐一加入（進世界才開始受重力），
    // 錯開掉落＋隨機旋轉與水平初速，像真的一個個被鬆手。
    // 注意：不能用 isStatic:true 再 setStatic(false)——matter.js 0.20
    // 對「出生即 static」的剛體恢復動態後質量不會重建，會永遠不動。
    Composite.add(engine.world, [...bounds, cursor])
    digits.forEach(({ body }, i) => {
        setTimeout(() => {
            Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.18)
            Body.setVelocity(body, { x: (Math.random() - 0.5) * 3, y: 0 })
            Composite.add(engine.world, body)
        }, 150 + i * 140 + Math.random() * 80)
    })

    const onMove = (e) => {
        const p = e.touches ? e.touches[0] : e
        const rect = container.getBoundingClientRect()
        // 第三個參數 updateVelocity：讓引擎知道游標的移動速度，
        // 碰撞時把動量傳給數字（快揮＝撞飛、慢推＝輕推），不然只會僵硬地擠開
        Body.setPosition(cursor, { x: p.clientX - rect.left, y: p.clientY - rect.top }, true)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })

    const runner = Runner.create()
    Runner.run(runner, engine)

    // 每幀把剛體位置同步回 DOM（相對原位的位移＋旋轉）
    let raf
    const render = () => {
        for (const d of digits) {
            d.el.style.transform =
                `translate(${d.body.position.x - d.x0}px, ${d.body.position.y - d.y0}px) rotate(${d.body.angle}rad)`
        }
        raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    cleanup = () => {
        cancelAnimationFrame(raf)
        Runner.stop(runner)
        Engine.clear(engine)
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('touchmove', onMove)
    }
})

onUnmounted(() => cleanup?.())
</script>

<template>
    <div>
        <TheHeader />
        <main class="error-main" ref="mainRef">
            <BgBlobs />
            <div class="error-wrap">
                <p class="error-code" ref="codeRef" :aria-label="title">
                    <span v-for="(ch, i) in [...title]" :key="i" class="error-digit" aria-hidden="true">{{ ch }}</span>
                </p>
                <h1 class="h4 error-message">{{ message }}</h1>
                <p class="error-hint" v-if="is404">可能是網址打錯，也可能它跟我的死線一樣被拖走了</p>
                <button type="button" class="button-CTA vibrate h5" @click="backHome">回首頁逛逛</button>
            </div>
        </main>
        <TheFooter />
    </div>
</template>
