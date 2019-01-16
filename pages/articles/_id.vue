<template>
    <div class="wrap">
        <div class="top"></div>
        <el-card v-loading="loading">
            <div v-html="form.html"></div>
        </el-card>
        <Comment />
    </div>
</template>

<script>
import {Table, TableColumn, Pagination} from 'element-ui';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

const highlightCode = () => {
    const preEl = document.querySelectorAll('pre')

    preEl.forEach((el) => {
      hljs.highlightBlock(el)
    })
}

import Comment from '@/components/pages/Comment';

export default {
    transition: 'page',
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Pagination.name]: Pagination,
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
            await this.$axios.$get(`articles/${this.$route.params.id}`).then((res) => {
                this.form = res;
            }).finally(() => this.loading = false);
        },

    },
    mounted() {
        this.fetchData();
    },
    updated () {
        highlightCode()
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

