<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <footer>
        <div class="footer-wrap">
            <div class="footer-content">
                <div class="footer-title">
                    <div class="brand">
                        <svg width="31" height="21" viewBox="0 0 31 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.6641 0.399999H20.2721V20H13.6641V0.399999ZM7.56009 20H0.952094V0.399999H7.56009V20ZM14.1121 12.776H7.11209V7.344H14.1121V12.776ZM26.396 20.28C25.3507 20.28 24.4733 19.944 23.764 19.272C23.0547 18.5813 22.7 17.704 22.7 16.64C22.7 15.5573 23.0547 14.6893 23.764 14.036C24.4733 13.3827 25.3507 13.056 26.396 13.056C27.4413 13.056 28.3187 13.3827 29.028 14.036C29.7373 14.6893 30.092 15.5573 30.092 16.64C30.092 17.704 29.7373 18.5813 29.028 19.272C28.3187 19.944 27.4413 20.28 26.396 20.28Z"
                                fill="#656565" />
                        </svg>
                    </div>
                    <div class="footer-link">
                        <!-- <a class="">About</a>
                        <a class="">Blog</a>
                        <a class="">Work</a>
                        <a class="">Contact</a> -->
                    </div>
                </div>
                <div class="footer-social">
                    <a href="mailto:o134888@gmail.com">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="mail">
                                <path id="Vector"
                                    d="M6.66668 33.3334C5.75001 33.3334 4.96557 33.0073 4.31334 32.3551C3.66112 31.7029 3.33445 30.9179 3.33334 30.0001V10.0001C3.33334 9.08341 3.66001 8.29897 4.31334 7.64675C4.96668 6.99453 5.75112 6.66786 6.66668 6.66675H33.3333C34.25 6.66675 35.035 6.99341 35.6883 7.64675C36.3417 8.30008 36.6678 9.08453 36.6667 10.0001V30.0001C36.6667 30.9167 36.3406 31.7017 35.6883 32.3551C35.0361 33.0084 34.2511 33.3345 33.3333 33.3334H6.66668ZM20 21.6667L33.3333 13.3334V10.0001L20 18.3334L6.66668 10.0001V13.3334L20 21.6667Z"
                                    fill="#929292" />
                            </g>
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/hsiaohan-h/" target="_blank">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="linkedin">
                                <path id="Vector"
                                    d="M31.6667 5C32.5507 5 33.3986 5.35119 34.0237 5.97631C34.6488 6.60143 35 7.44928 35 8.33333V31.6667C35 32.5507 34.6488 33.3986 34.0237 34.0237C33.3986 34.6488 32.5507 35 31.6667 35H8.33333C7.44928 35 6.60143 34.6488 5.97631 34.0237C5.35119 33.3986 5 32.5507 5 31.6667V8.33333C5 7.44928 5.35119 6.60143 5.97631 5.97631C6.60143 5.35119 7.44928 5 8.33333 5H31.6667ZM30.8333 30.8333V22C30.8333 20.559 30.2609 19.177 29.2419 18.1581C28.223 17.1391 26.841 16.5667 25.4 16.5667C23.9833 16.5667 22.3333 17.4333 21.5333 18.7333V16.8833H16.8833V30.8333H21.5333V22.6167C21.5333 21.3333 22.5667 20.2833 23.85 20.2833C24.4688 20.2833 25.0623 20.5292 25.4999 20.9668C25.9375 21.4043 26.1833 21.9978 26.1833 22.6167V30.8333H30.8333ZM11.4667 14.2667C12.2093 14.2667 12.9215 13.9717 13.4466 13.4466C13.9717 12.9215 14.2667 12.2093 14.2667 11.4667C14.2667 9.91667 13.0167 8.65 11.4667 8.65C10.7196 8.65 10.0032 8.94675 9.47498 9.47498C8.94675 10.0032 8.65 10.7196 8.65 11.4667C8.65 13.0167 9.91667 14.2667 11.4667 14.2667ZM13.7833 30.8333V16.8833H9.16667V30.8333H13.7833Z"
                                    fill="#929292" />
                            </g>
                        </svg>
                    </a>
                    <a href="https://hsiaohan.myportfolio.com/" target="_blank">
                        <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="behance">
                                <path id="Vector"
                                    d="M13.3996 24.1786C14.5513 24.1786 15.4888 23.7701 15.4888 22.4777C15.4888 21.1585 14.7054 20.6429 13.4598 20.6362H10.3795V24.1786H13.3996ZM13.0379 15.5H10.3862V18.5H13.2455C14.2567 18.5 14.9732 18.058 14.9732 16.9665C14.9732 15.7812 14.0558 15.5 13.0379 15.5ZM21.7098 20.5089H25.875C25.7612 19.2701 25.1183 18.5201 23.8326 18.5201C22.6071 18.5201 21.7902 19.2835 21.7098 20.5089ZM28.7143 5H7.28571C4.92188 5 3 6.92188 3 9.28571V30.7143C3 33.0781 4.92188 35 7.28571 35H28.7143C31.0781 35 33 33.0781 33 30.7143V9.28571C33 6.92188 31.0781 5 28.7143 5ZM26.404 15.2455H21.1942V13.9799H26.404V15.2455ZM15.971 19.1763C17.5513 19.625 18.3147 21.0179 18.3147 22.6317C18.3147 25.2433 16.125 26.3616 13.7879 26.375H7.55357V13.5179H13.6138C15.817 13.5179 17.7254 14.1406 17.7254 16.6987C17.7254 17.9911 17.1228 18.6272 15.971 19.1763ZM23.9196 16.5915C26.8326 16.5915 28.4464 18.8884 28.4464 21.6406C28.4464 21.7478 28.4397 21.8616 28.433 21.9754C28.433 22.029 28.4263 22.0759 28.4263 22.1228H21.7165C21.7165 23.6094 22.5 24.4866 24 24.4866C24.7768 24.4866 25.7746 24.0714 26.0223 23.2746H28.279C27.5826 25.4107 26.1429 26.4085 23.9196 26.4085C20.9866 26.4085 19.1585 24.4196 19.1585 21.5201C19.1585 18.721 21.0804 16.5915 23.9196 16.5915Z"
                                    fill="#929292" />
                            </g>
                        </svg>
                    </a>
                </div>
            </div>
            <p class="copyright button-S">© HsiaoHan 2024 Copyright. All Rights Reserved.</p>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
// @import '@/assets/layout/footer'</style>