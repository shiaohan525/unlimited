<script setup>
import { onMounted } from 'vue';


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
        <div id="loader-logo"></div>
        <div id="loader-circle"></div>
        <div class="loader-section section-left"></div>
        <div class="loader-section section-right"></div>
    </div>
</template>



<style lang="scss" scoped>
// @import '@/assets/components/bgblobs'</style>
