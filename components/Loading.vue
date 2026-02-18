<script setup>
import { onMounted } from 'vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';

const isLoaded = ref(false); // 響應式變數

onMounted(() => {
    const random = Math.floor(Math.random() * 2000) + 2000; // 隨機延遲

    setTimeout(() => {
        isLoaded.value = true; // 加載完成後設置為 true
    }, random);
});
</script>

<template>
    <div id="pre-loader" :class="{ loaded: isLoaded }">
        <!-- <div id="loader-circle"></div> -->
        <DotLottieVue src="https://lottie.host/1e84dd77-95c6-4a4c-a546-0ff14b585e88/z471LZS4W8.lottie"
            class="load-animation" autoplay loop></DotLottieVue>
        <div class="loader-section section-left"></div>
        <div class="loader-section section-right"></div>
    </div>
</template>
