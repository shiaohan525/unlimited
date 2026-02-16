<template>
    <Loading />
    <BgBlobs />
    <TheHeader />
    <!-- <Banner /> -->
    <!-- 页面内容 -->
    <NuxtPage />
    <TheFooter />
</template>

<script setup>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import Loading from '../components/Loading.vue';
</script>