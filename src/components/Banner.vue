<script setup>
import { gsap } from 'gsap';
import { ref, onMounted } from 'vue';

onMounted(() => {
  var bannerFadeIn = gsap.timeline();
  bannerFadeIn.to('.banner-wrap', {
    y: 0,
    opacity: 1,
    duration: 1
  }, 1)
});

</script>

<template>
  <div class="banner" ref="banner">
    <section class="banner-wrap">
      <h2 class="h1">I’m HsiaoHan</h2>
      <h3 class="h3">用好奇心感受世界，以同理心碰撞思維</h3>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/components/banner'
</style>
