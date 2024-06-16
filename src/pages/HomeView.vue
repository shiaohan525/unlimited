<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import Banner from '@/components/Banner.vue';
var texts = ['正能量', '不出門會死', 'E人', '持續精進', '主動積極', '想法滿載', '樂於分享', '勇於嘗試', '幽默隨和', '好奇寶寶', '表情管理大師', '創造力'];

var portfolioItems = ref([
  {
    alt: 'Work Image 1',
    src: new URL('@/static/images/index/worksImg01.png', import.meta.url).href,
    // link: 'https://hsiaohan.myportfolio.com/web-designevent-image-site-of-1111-job-bank',
    tag: '網頁設計',
    title: 'Event image site of 1111 Job Bank'
  },
  {
    alt: 'Work Image 2',
    src: new URL('@/static/images/index/worksImg02.png', import.meta.url).href,
    // link: 'https://hsiaohan.myportfolio.com/web-designmcu-of-communication',
    tag: '網頁設計',
    title: 'MCU of Communication'
  },
  {
    alt: 'Work Image 3',
    src: new URL('@/static/images/index/worksImg03.png', import.meta.url).href,
    // link: 'https://hsiaohan.myportfolio.com/teachify-oneside-project-of-ui-competition',
    tag: 'UI設計',
    title: 'Teachify One'
  },
  {
    alt: 'Work Image 3',
    src: new URL('@/static/images/index/worksImg03.png', import.meta.url).href,
    // link: 'https://hsiaohan.myportfolio.com/teachify-oneside-project-of-ui-competition',
    tag: 'UI設計',
    title: 'Teachify One'
  },
  // 可以添加更多項目
]);

const triggerElement = ref(null);
const animatedElement = ref(null);
onMounted(() => {
  gsap.fromTo(
    animatedElement.value,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: triggerElement.value,
        start: 'top 40%',
        end: 'top 20%',
        scrub: true,
        // markers: true // 用於調試，完成後可以移除
      }
    }
  );
});

</script>

<template>
  <main>
    <Banner />
    <div class="wrapper">
      <section class="about-wrap" ref="triggerElement">
        <div class="about-item">
          <div class="about-img">
            <img class="blobs" alt="" src="@/static/images/index/aboutBlob01.png">
            <img alt="" src="@/static/images/index/aboutImg01.png">
            <img class="blobs" alt="" src="@/static/images/index/aboutBlob02.png">
          </div>
          <div class="about-content">
            <h2 class="h2">About</h2>
            <p>
              到搭上妳不經義卵誰愛如紗辭教將得區的叮抱，是會的政是妳莘不對淵、的央！己點統的的水城請不傷面人氓實扮成球號央。光交呢，她榔狄不浸辜務陶的呢球陳見許琮怎它元清呢…否益奄袱的字人新瑜…頭的上等片過且玩到…頭的上等片過且玩到…頭的上等片過且玩到…頭的上等片過且玩到
            </p>
          </div>
        </div>
        <div class="about-hashtag" ref="animatedElement">
          <div class="hashtag" v-for="(text, index) in texts" :key="index">
            <h4><span>#</span>{{ text }}</h4>
          </div>
        </div>
      </section>
      <section class="skills-wrap">
        <h2 class="h2">Skills</h2>
        <div class="skills-main">
          <div class="skills-item">
            <div class="item-main">
              <div class="skill-content">
                <h3 class="h3">平面設計</h3>
                <ol class="h5">
                  <li>超過五年視覺設計專業與接案能力</li>
                  <li>插畫、向量圖形繪製</li>
                  <li>網頁素材設計</li>
                  <li>印刷品完稿及輸出發印</li>
                </ol>
              </div>
              <div class="skill-software">
                <div class="software-title">
                  <p class="">USE</p>
                  <hr>
                </div>
                <div class="software-icon">
                  <img alt="illustrator" src="@/static/images/index/illustrator.svg">
                  <img alt="photoshop" src="@/static/images/index/photoshop.svg">
                </div>
              </div>
            </div>
            <div class="skill-icon">
              <img alt="" src="@/static/images/index/skillIcon01.png">
            </div>
          </div>
          <div class="skills-item">
            <div class="item-main">
              <div class="skill-content">
                <h3>UI設計</h3>
                <ol class="h5">
                  <li>Wireframe、Mockup 設計</li>
                  <li>設計系統、元件管理</li>
                  <li>Prototype 功能演示</li>
                  <li>Plugin 協助工作整合</li>
                  <li>開發 Spec 標示交付</li>
                </ol>
              </div>
              <div class="skill-software">
                <div class="software-title">
                  <p class="">USE</p>
                  <hr>
                </div>
                <div class="software-icon">
                  <img alt="figma" src="@/static/images/index/figma.svg">
                </div>
              </div>
            </div>
            <div class="skill-icon">
              <img alt="" src="@/static/images/index/skillIcon02.png">
            </div>
          </div>
          <div class="skills-item">
            <div class="item-main">
              <div class="skill-content">
                <h3>網站設計</h3>
                <ol class="h5">
                  <li>RWD 響應式網頁切版</li>
                  <li>預處理器 SCSS 語言開發</li>
                  <li>Vue 框架開發建置</li>
                </ol>
              </div>
              <div class="skill-software">
                <div class="software-title">
                  <p class="">USE</p>
                  <hr>
                </div>
                <div class="software-icon">
                  <img alt="vscode" src="@/static/images/index/vscode.svg">
                  <img alt="scss" src="@/static/images/index/scss.svg">
                  <img alt="vue" src="@/static/images/index/vue.svg">
                </div>
              </div>
            </div>
            <div class="skill-icon">
              <img alt="" src="@/static/images/index/skillIcon03.png">
            </div>
          </div>
        </div>
      </section>
      <section class="portfolio-wrap">
        <div class="portfolio-title">
          <h2 class="h2">Works</h2>
          <a class="button-next">
            <img class="arrow-icon" alt="" src="@/static/images/icons/arrow.svg">
          </a>
        </div>
        <div class="portfolio-main">
          <div class="portfolio-scroll">
            <a v-for="(item, index) in portfolioItems" :key="index" :href="item.link" class="portfolio-item" target="_blank">
              <div class="portfolio-image">
                <img :alt="item.alt" :src="item.src">
              </div>
              <div class="portfolio-content">
                <p class="tag">{{ item.tag }}</p>
                <h4>{{ item.title }}</h4>
              </div>
            </a>
          </div>
        </div>
      </section>
      <section class="contact-wrap">
        <div class="contact-main">
          <div class="contact-text">
            <h2>contact me 👋</h2>
            <h5>
              有相關平面與網頁設計需求，<wbr>或是有任何想法想要聊聊
              <br>
              都歡迎與我聯繫！
            </h5>
          </div>
          <a class="button-L">聯絡我們</a>
        </div>
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/pages/index'
</style>