<template>
    <div class="code-block-wrapper">
        <button @click="copyCode" class="copy-button">
            {{ copied ? '已複製！' : '複製' }}
        </button>

        <pre :class="$props.class"><slot /></pre>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    code: { type: String, default: '' },
    language: { type: String, default: null },
    filename: { type: String, default: null },
    highlights: { type: Array, default: () => [] },
    meta: { type: String, default: null },
    class: { type: String, default: null }
})

const copied = ref(false)

const copyCode = () => {
    if (props.code) {
        navigator.clipboard.writeText(props.code).then(() => {
            copied.value = true
            setTimeout(() => {
                copied.value = false
            }, 2000)
        })
    }
}
</script>

<style scoped>
.code-block-wrapper {
    position: relative;
    margin: 1.5rem 0;
}

.copy-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    z-index: 10;
    padding: 4px 8px;
    font-size: 12px;
    background-color: var(--colors-gray-100);
    color: var(--colors-gray-600);
    border: 1px solid var(--colors-gray-400);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
}

.copy-button:hover {
    background-color: var(--colors-gray-200);
}

/* 確保 pre 不會被按鈕遮擋文字過多 */
pre {
    margin: 0 !important;
    padding-top: 2rem !important;
}
</style>