<template>
    <el-card class="comment">
        <h3>Comments</h3>
        <Reply />
        <el-table :data="list" v-loading="loading">
            <el-table-column>
                <template slot-scope="{row}">
                    <div class="img">
                        <img :src="row.email" />
                    </div>
                    <div class="info">
                        <div class="name">
                            <a :href="row.url" target="_blank">
                                {{row.name}}
                            </a>
                        </div>
                        <div>
                            <span class="time">{{row.createdAt}}</span>
                        </div>
                    </div>
                    <div class="content">
                        <vue-markdown>{{row.content}}</vue-markdown>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: center">
            <el-pagination layout="total, prev, pager, next"
                @current-change="fetchComment"
                :page-size="pagination.page_size"
                :total="pagination.total">
            </el-pagination>
        </div>
    </el-card>
</template>

<script>
import {Table, TableColumn, Pagination} from 'element-ui';
import Reply from '@/components/pages/Reply';
import VueMarkdown from 'vue-markdown';

export default {
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Pagination.name]: Pagination,
        Reply,
        VueMarkdown,
    },
    data() {
        return {
            loading: false,
            list: [],
            pagination: {
                total: 0,
                page_size: 6,
            },
        };
    },
    methods: {
        async fetchComment() {
            this.loading = true;
            let url = this.list.length ? `comments?article_id=${this.$route.params.id}&last_id=${this.list[this.list.length - 1].id}` : `comments?article_id=${this.$route.params.id}`;
            await this.$axios.$get(url).then((res) => {
                this.list = res;
            }).finally(() => this.loading = false);
        },
        async fetchTotal() {
            this.loading = true;
            await this.$axios.$get(`comments/count?article_id=${this.$route.params.id}`).then((res) => {
                this.pagination.total = res;
            }).finally(() => this.loading = false);
        },
    },
    mounted() {
        this.fetchTotal();
        this.fetchComment();
    }
};
</script>

<style lang="scss" scoped>
.comment {
    margin-top: 30px;
    .img {
        background: #000;
        float: left;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
        img {
            width: 41px;
            height: 41px;
        }
    }
    .info {
        margin-left: 10px;
        .name {
            a {
                font-size: 16px;
                font-weight: bold;
            }
        }
    }
    .content {
        margin-top: 15px;
        font-size: 14px;
        line-height: 30px;
        color: #63686d;
    }
}
</style>
