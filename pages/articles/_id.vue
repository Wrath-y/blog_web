<template>
	<el-card class="wrap" v-loading="loading">
        <div class="con" v-html="form.html"></div>
    </el-card>
</template>

<script>
import {Table, TableColumn, Pagination} from 'element-ui';
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

const highlightCode = () => {
  const preEl = document.querySelectorAll('pre')

  preEl.forEach((el) => {
    hljs.highlightBlock(el)
  })
}

export default {
    transition: 'page',
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Pagination.name]: Pagination
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
        }
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
    .con {
        margin-top: 61px;
    }
}
</style>

