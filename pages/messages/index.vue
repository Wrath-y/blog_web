<template>
    <div class="wrap">
        <div class="top"></div>
        <el-card v-loading="loading">
            <div v-html="form.html"></div>
        </el-card>
        <Comment :id=1 />
    </div>
</template>

<script>
import '@/assets/css/lines.css';
import '@/assets/css/customemin.css';

import Comment from '@/components/pages/Comment';

export default {
    transition: 'page',
    head: {
        script: [
            { src: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js' }
        ],
        link: [
        ]
    },
    components: {
        Comment,
    },
    data() {
        return {
            loading: false,
            form: {},
    };
    },
    computed: {},
    watch: {},
    methods: {
        async fetchData() {
            this.loading = true;
            await this.$axios.$get('articles/1').then((res) => {
                this.form = res;
            }).finally(() => this.loading = false);
        },

    },
    mounted() {
        this.fetchData();
    }
};
</script>

<style scoped lang="scss">
.wrap {
    width: 50%;
    margin: auto;
    .top {
        padding-top: 81px;
    }
}
</style>

