<template>
    <el-card class="comment">
        <h3>Comments</h3>
        <Reply v-if="this.show_to_reply" @refresh="fetchComment" />
        <el-table :data="list" v-loading="loading">
            <el-table-column>
                <template slot-scope="{$index, row}">
                    <div class="comment">
                        <div class="img">
                            <img :src="row.avatar" />
                        </div>
                        <div class="info">
                            <div class="name">
                                <a :href="row.url" target="_blank">
                                    {{ row.name }}
                                </a>
                            </div>
                            <div>
                                <span class="time">{{ getNowFormatDate(row.created_at) }}</span>
                                <el-button class="reply-btn" type="text"
                                    @click="replyBtn($index, row)">REPLY</el-button>
                            </div>
                        </div>
                        <div class="content">
                            <vue-markdown :source="row.content"></vue-markdown>
                        </div>
                        <Reply v-if="row.reply" :last_id="last_id" :reply_to="reply_to" :pid="row.id"
                            @cancel="cancelBtn($index)" @refresh="refresh()" />
                    </div>
                    <div v-if="row.childs" class="sub-comment">
                        <div class="sub-comment-item" v-for="(item, index) in row.childs" :key="index">
                            <div class="img">
                                <img :src="item.avatar" />
                            </div>
                            <div class="info">
                                <div class="name">
                                    <a :href="item.url" target="_blank">
                                        {{ item.name }}
                                    </a>
                                </div>
                                <div>
                                    <span class="time">{{ getNowFormatDate(item.created_at) }}</span>
                                    <el-button class="reply-btn" type="text"
                                        @click="replyBtn(index, item, $index)">REPLY</el-button>
                                </div>
                            </div>
                            <div class="content">
                                <vue-markdown>{{ item.content }}</vue-markdown>
                            </div>
                            <Reply v-if="item.reply" :last_id="last_id" :reply_to="reply_to" :pid="row.id"
                                @cancel="cancelBtn($index, index)" @refresh="refresh()" />
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: center">
            <el-pagination layout="total, prev, pager, next" @current-change="fetchComment"
                :page-size="pagination.page_size" :total="pagination.total">
            </el-pagination>
        </div>
    </el-card>
</template>

<script>
import { Table, TableColumn, Pagination } from 'element-ui';
import Reply from '@/components/pages/articles/Reply';
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
            reload: this.reload,
            pagination: {
                total: 0,
                page_size: 6,
            },
            show_to_reply: true,
            reply_to: '',
            last_ids: [],
            last_id: 0,
            current_page: 0,
        };
    },
    props: ["id"],
    methods: {
        async fetchComment(page = 1) {
            if (!this.$route.params.id > 0) {
                this.$route.params.id = this.id;
            }
            this.fetchTotal();
            let url = page > 1 ? `comments?article_id=${this.$route.params.id}&last_id=${this.last_ids[page]}` : `comments?article_id=${this.$route.params.id}`;
            this.loading = true;
            await this.$axios.$get(url).then((res) => {
                this.format(res, page);
            }).finally(() => this.loading = false);
        },
        async fetchTotal() {
            if (!this.$route.params.id > 0) {
                this.$route.params.id = this.id;
            }
            this.loading = true;
            await this.$axios.$get(`comments/count?article_id=${this.$route.params.id}`).then((res) => {
                this.pagination.total = res.data?.count;
            }).finally(() => this.loading = false);
        },
        replyBtn(index, row, parent_index = -1) {
            this.reply_to = `@${row.name}`;
            this.show_to_reply = false;
            this.list.forEach((el) => {
                el.childs.forEach((e) => {
                    e.reply = false;
                    return e;
                })
                el.reply = false;
                return el;
            });
            row.reply = true;
            if (parent_index > -1) {
                this.list[parent_index].childs[index] = row;
            } else {
                this.$set(this.list, index, row);
            }
        },
        cancelBtn(i, j = -1) {
            if (j < 0) {
                this.list[i].reply = false;
            } else {
                this.list[i].childs[j].reply = false;
            }
            this.reply_to = '';
            this.show_to_reply = true;
        },
        format(res, page) {
            if (!res.data.length) {
                return;
            }
            res.data.forEach((el) => {
                el.reply = false;
                return el;
            });
            this.last_id = this.last_ids[page] = res.data[res.data.length - 1].id;
            let del_ids = [];
            this.list = [];
            this.list = res.data.map((el) => {
                el.childs = res.data.filter((e) => {
                    if (e.pid === el.id) {
                        del_ids.push(e.id);
                        return true;
                    }
                    return false;
                });
                return el;
            }).filter((el) => {
                return !del_ids.find((e) => {
                    return e === el.id;
                });
            });
        },
        getNowFormatDate(timetsamp) {
            const date = new Date(timetsamp);
            const year = date.getFullYear()
            const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth()
            const day = date.getDate() + 1 < 10 ? `0${date.getDate() + 1}` : date.getDate()
            const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
            const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
            const second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
            return `${year}-${month}-${day} ${hour}:${minute}:${second}`
        },
        refresh() {
            window.location.reload();
        }
    },
    mounted() {
        this.fetchComment();
    }
};
</script>

<style lang="scss" scoped>
.comment {
    margin-top: 30px;

    .comment:hover,
    .sub-comment-item:hover {
        .info {
            .reply-btn {
                opacity: 1;
            }
        }
    }

    .img {
        background: rgba(0, 0, 0, 0);
        float: left;
        width: 40px;
        height: 40px;
        margin-right: 10px;

        img {
            width: 41px;
            height: 41px;
            border-radius: 50%;
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

        .reply-btn {
            font-size: 12px;
            display: block;
            margin-left: 10px;
            float: right;
            color: #fff;
            background-color: #e2684a;
            line-height: 20px;
            padding: 0 6px;
            border-radius: 3px;
            opacity: 0;
        }
    }

    .content {
        margin-top: 15px;
        font-size: 14px;
        line-height: 30px;
        color: #63686d;
    }

    .sub-comment {
        display: block;
        margin-left: 80px;

        .sub-comment-item {
            border-top: 1px solid #ccc;
            padding-top: 30px;
        }
    }
}
</style>
