<template>
    <div class="wrap">
        <div class="top"></div>
        <el-card v-loading="loading">
            <div v-html="form.html"></div>
        </el-card>
    </div>
</template>

<script>
import '@/assets/css/lines.css';
import '@/assets/css/customemin.css';

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
            await this.$axios.$get(`articles/2`).then((res) => {
                this.form = res.data;
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

