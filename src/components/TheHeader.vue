<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
    <header>
        <img alt="Vue logo" class="logo" src="@/static/images/logo.svg" width="125" height="125" />

        <div class="wrapper">
            <HelloWorld msg="You did it！！！" />

            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
            </nav>
        </div>
    </header>
    <!-- 開發完以上刪除------- -->
    <header class="header">
        <div class="header-main">
            <div class="brand">H.</div>
            <div class="nav">
                <b class="about">About</b>
                <b class="about">Blog</b>
                <b class="about">Work</b>
                <b class="about">Contact</b>
            </div>
            <div class="dark-switch">
                <div class="button-dark">
                    <!-- <img class="lcon-dark-icon" alt="" src="lcon-dark.svg"> -->
                </div>
                <div class="button-light">
                    <!-- <img class="lcon-dark-icon" alt="" src="lcon-light.svg"> -->
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@import '@/assets/layout/header'
</style>