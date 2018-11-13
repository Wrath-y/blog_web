<template>
    <div>
        <navigator />
        <nuxt/>
    </div>
</template>

<script>
import Navigator from '@/components/layout/Navigator';

export default {
    transition: 'page',
    components: {
        Navigator,
    },
    data() {
        return {};
    },
    computed: {},
    watch: {},
    methods: {},
    mounted() {
    },
    beforeDestroy() {
    },
};
</script>

<style>
body {
    font-family: 'Source Han Serif SC','Source Han Serif','source-han-serif-sc','PT Serif','SongTi SC','MicroSoft Yahei',Georgia,serif;
    color: #404040;
    font-size: 15px;
    line-height: 1.5;
    margin: 0;
}
</style>