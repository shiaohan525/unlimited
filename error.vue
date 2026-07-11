<script setup>
// 全站錯誤頁：404 與其他錯誤分開文案，風格走極簡玩味
// 404 數字有物理互動：進頁掉落，游標／手指可以推著走（matter.js）
const props = defineProps({
    error: Object
})

const is404 = computed(() => props.error?.statusCode === 404)

const title = computed(() => (is404.value ? '404' : String(props.error?.statusCode || '500')))
// 主文案拆兩段：桌機一行帶頓號、手機在此斷行不顯示頓號
const messageParts = computed(() =>
    is404.value
        ? ['這個頁面跟我的靈感一樣', '暫時走丟了']
        : ['伺服器打了個盹', '請稍後再試']
)
const message = computed(() => messageParts.value.join('，'))

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

    const { Engine, Runner, Bodies, Body, Composite, Events } = await import('matter-js')

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

    // 四面封閉：厚牆（240px）防高速穿隧，互動範圍就是眼前這塊畫面
    const wallOpts = { isStatic: true }
    const W = 240
    const bounds = [
        Bodies.rectangle(cRect.width / 2, cRect.height + W / 2, cRect.width + W * 4, W, wallOpts),
        Bodies.rectangle(cRect.width / 2, -W / 2, cRect.width + W * 4, W, wallOpts),
        Bodies.rectangle(-W / 2, cRect.height / 2, W, cRect.height + W * 4, wallOpts),
        Bodies.rectangle(cRect.width + W / 2, cRect.height / 2, W, cRect.height + W * 4, wallOpts)
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

    // 鎖死頁面捲動：iOS 的橡皮筋效果 overflow:hidden 擋不住，
    // 要在 touchmove 上 preventDefault（不影響按鈕點擊，只擋捲動手勢）
    const blockScroll = (e) => e.preventDefault()
    container.addEventListener('touchmove', blockScroll, { passive: false })

    // --- 陀螺儀模式（手機／平板）：裝置傾斜＝重力方向，數字往傾斜側滾 ---
    const applyOrientation = (e) => {
        if (e.beta == null || e.gamma == null) return
        // 依螢幕方向校正軸向（直立／橫放）
        const angle = screen.orientation?.angle ?? window.orientation ?? 0
        let gx = e.gamma / 90 // 左右傾
        let gy = e.beta / 90 // 前後傾
        if (angle === 90) {
            const t = gx
            gx = gy
            gy = -t
        } else if (angle === -90 || angle === 270) {
            const t = gx
            gx = -gy
            gy = t
        } else if (angle === 180) {
            gx = -gx
            gy = -gy
        }
        engine.gravity.x = Math.max(-1, Math.min(1, gx)) * 1.2
        engine.gravity.y = Math.max(-1, Math.min(1, gy)) * 1.2
    }

    const hasGyro = typeof DeviceOrientationEvent !== 'undefined'
    const needsPermission = hasGyro && typeof DeviceOrientationEvent.requestPermission === 'function'
    const enableGyro = async () => {
        try {
            if (needsPermission) {
                const res = await DeviceOrientationEvent.requestPermission()
                if (res !== 'granted') return
            }
            window.addEventListener('deviceorientation', applyOrientation, true)
        } catch {
            /* 不支援或被拒絕就維持固定重力 */
        }
    }
    if (hasGyro) {
        if (needsPermission) {
            // iOS 13+ 權限必須由使用者手勢觸發：第一次觸碰畫面時啟用
            window.addEventListener('touchend', enableGyro, { once: true })
        } else {
            enableGyro()
        }
    }

    // 防彈出：限速（高速才會穿牆）＋逃逸救援（萬一出界就抓回場內重摔）
    const MAX_SPEED = 28
    Events.on(engine, 'beforeUpdate', () => {
        for (const d of digits) {
            const v = d.body.velocity
            const speed = Math.hypot(v.x, v.y)
            if (speed > MAX_SPEED) {
                Body.setVelocity(d.body, { x: (v.x / speed) * MAX_SPEED, y: (v.y / speed) * MAX_SPEED })
            }
            const p = d.body.position
            if (p.x < -60 || p.x > cRect.width + 60 || p.y < -120 || p.y > cRect.height + 60) {
                Body.setPosition(d.body, {
                    x: Math.min(Math.max(p.x, 80), cRect.width - 80),
                    y: 60
                })
                Body.setVelocity(d.body, { x: 0, y: 2 })
                Body.setAngularVelocity(d.body, 0)
            }
        }
    })

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
        window.removeEventListener('deviceorientation', applyOrientation, true)
        window.removeEventListener('touchend', enableGyro)
        container.removeEventListener('touchmove', blockScroll)
    }
})

onUnmounted(() => cleanup?.())
</script>

<template>
    <div class="error-page">
        <TheHeader />
        <main class="error-main" ref="mainRef">
            <BgBlobs />
            <div class="error-wrap">
                <p class="error-code" ref="codeRef" :aria-label="title">
                    <span v-for="(ch, i) in [...title]" :key="i" class="error-digit" aria-hidden="true">{{ ch }}</span>
                </p>
                <h1 class="h4 error-message" :aria-label="message">
                    {{ messageParts[0] }}<span class="error-msg-sep">，</span><br class="error-msg-br" />{{ messageParts[1] }}
                </h1>
                <p class="error-hint" v-if="is404">可能是網址打錯，也可能它跟我的死線一樣被拖走了</p>
                <button type="button" class="button-CTA vibrate h5" @click="backHome">回首頁逛逛</button>
            </div>
        </main>
        <TheFooter />
    </div>
</template>
