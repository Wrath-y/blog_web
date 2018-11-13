<template>
    <div class="headertop filter-dot">
        <div class="header-bg-box">
            <img class="header-bg-img" src="../assets/images/header.png" />
        </div>
    </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
    components: {
        Logo
    },
    methods: {},
}
</script>

<style scoped>
.headertop.filter-dot::before {
    background-image: url('../assets/images/dot.gif')
}
.headertop {
    height: auto;
    position: relative;
    overflow: hidden;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: none;
    animation-play-state: running;
}
.headertop::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    background-attachment: fixed;
}
.header-bg-box {
    height: 938px;
    overflow: hidden;
}
.header-bg-img {
    width: 100%;
}
</style>
