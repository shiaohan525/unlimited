<script setup>
import { onMounted } from 'vue';

// 定義一些常量
const MIN_SPEED = 0.5;
const MAX_SPEED = 2;

// 隨機數函數
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// 定義 Blob 類
class Blob {
  constructor(el) {
    this.el = el;
    const boundingRect = this.el.getBoundingClientRect();
    this.size = boundingRect.width;
    // 隨機初始位置
    this.initialX = randomNumber(0, window.innerWidth - this.size);
    this.initialY = randomNumber(0, window.innerHeight - this.size);
    this.el.style.top = `${this.initialY}px`;
    this.el.style.left = `${this.initialX}px`;
    // 速度
    this.vx =
      randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
    this.vy =
      randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
    this.x = this.initialX;
    this.y = this.initialY;
  }

  // 更新 Blob 的位置
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x >= window.innerWidth - this.size) {
      this.x = window.innerWidth - this.size;
      this.vx *= -1;
    }
    if (this.y >= window.innerHeight - this.size) {
      this.y = window.innerHeight - this.size;
      this.vy *= -1;
    }
    if (this.x <= 0) {
      this.x = 0;
      this.vx *= -1;
    }
    if (this.y <= 0) {
      this.y = 0;
      this.vy *= -1;
    }

    this.el.style.transform = `translate(${this.x - this.initialX}px, ${this.y - this.initialY}px)`;
  }
}

// 初始化 Blobs 的函數
function initBlobs() {
  const blobEls = document.querySelectorAll(".blob");
  const blobs = Array.from(blobEls).map((blobEl) => new Blob(blobEl));

  function update() {
    requestAnimationFrame(update);
    blobs.forEach((blob) => blob.update());
  }
  requestAnimationFrame(update);
}

// 使用 onMounted 在組件掛載後執行
onMounted(() => {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    initBlobs();
  }
});
</script>

<template>
  <div class="blobs">
    <div class="blob"></div>
    <div class="blob"></div>
    <div class="blob"></div>
    <div class="blob"></div>
    <div class="blob"></div>
  </div>
</template>
