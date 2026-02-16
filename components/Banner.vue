<script setup>
import { gsap } from 'gsap';
import { ref, onMounted } from 'vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';

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
      <h1 class="h1">I'm Hailey, a designer.</h1>
      <h3 class="h5">用好奇心感受世界<br><span>，</span>以同理心碰撞思維</h3>
    </section>
    <DotLottieVue src="https://lottie.host/14b1ad5d-ecd5-4d1d-bdbc-347da00f9de2/zRdJCYH2o6.lottie"
      background="transparent" speed="1" loop autoplay class="banner-down">
    </DotLottieVue>
  </div>
</template>

<style lang="scss" scoped>
// @import '~/assets/components/banner';</style>
