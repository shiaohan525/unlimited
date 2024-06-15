<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import BgBlobs from '@/components/BgBlobs.vue'
</script>

<template>
  <BgBlobs />
  <TheHeader/>
  <RouterView />
  <TheFooter />
</template>

<style lang="scss">
</style>
