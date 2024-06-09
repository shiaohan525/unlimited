<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <footer class="footer">
        <div class="footer-main">
            <div class="footer-content">
                <div class="footer-content1">
                    <div class="h">H.</div>
                    <div class="footer-link">
                        <b class="about">About</b>
                        <b class="about">Blog</b>
                        <b class="about">Work</b>
                        <b class="about">Contact</b>
                    </div>
                </div>
                <div class="footer-social">
                    <!-- <img class="mail-icon" alt="" src="mail.svg">
                    <img class="mail-icon" alt="" src="linkedin.svg">
                    <img class="behance-icon" alt="" src="behance.svg"> -->
                </div>
            </div>
            <div class="copyright">© HsiaoHan 2024 Copyright. All Rights Reserved.</div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@import '@/assets/layout/header'
</style>