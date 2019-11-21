<template>
    <el-card class="comment">
        <h3>Comments</h3>
        <Reply v-if="this.show_to_reply" @refresh="fetchComment" :article_id="id" />
        <el-table :data="list" v-loading="loading">
            <el-table-column>
                <template slot-scope="{$index, row}">
                    <div class="comment">
                        <div class="img">
                            <img :src="row.image" />
                        </div>
                        <div class="info">
                            <div class="name">
                                <a :href="row.url" target="_blank">
                                    {{row.name}}
                                </a>
                            </div>
                            <div>
                                <span class="time">{{row.createdAt}}</span>
                                <el-button class="reply-btn" type="text" @click="replyBtn($index, row)">REPLY</el-button>
                            </div>
                        </div>
                        <div class="content">
                            <vue-markdown :source="row.content"></vue-markdown>
                        </div>
                        <Reply v-if="row.reply" :reply_to="reply_to" :pid="row.id" :article_id="id" @cancel="cancelBtn($index)" @refresh="fetchComment" />
                    </div>
                    <div v-if="row.childs" class="sub-comment">
                        <div class="sub-comment-item" v-for="(item, index) in row.childs" :key="index">
                            <div class="img">
                                <img :src="item.image" />
                            </div>
                            <div class="info">
                                <div class="name">
                                    <a :href="item.url" target="_blank">
                                        {{item.name}}
                                    </a>
                                </div>
                                <div>
                                    <span class="time">{{item.createdAt}}</span>
                                    <el-button class="reply-btn" type="text" @click="replyBtn(index, item, $index)">REPLY</el-button>
                                </div>
                            </div>
                            <div class="content">
                                <vue-markdown>{{item.content}}</vue-markdown>
                            </div>
                            <Reply v-if="item.reply" :reply_to="reply_to" :pid="row.id" :ppid="item.id" :article_id="id" @cancel="cancelBtn($index,index)" @refresh="fetchComment" />
                        </div>
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
import md5 from 'md5';

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
            show_to_reply: true,
            reply_to: '',
            last_id: [],
            current_page: 0,
        };
    },
    props: ["id"],
    methods: {
        async fetchComment(page = 1) {
            this.fetchTotal();
            if (!this.$route.params.id > 0) {
                this.$route.params.id = this.id;
            }
            let url = page > 1 ? `comments?article_id=${this.$route.params.id}&last_id=${this.last_id[page]}` : `comments?article_id=${this.$route.params.id}`;
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
                this.pagination.total = res;
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
            if (!res.length) {
                return;
            }
            res.forEach((el) => {
                el.reply = false;
                el.image = 'https://www.gravatar.com/avatar/' + md5(el.email || 'example');
                return el;
            });
            this.last_id[page] = res[res.length - 1].id;
            let del_ids = [];
            this.list = [];
            this.list = res.map((el) => {
                el.childs = res.filter((e) => {
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
    },
    mounted() {
        this.fetchComment();
    }
};
</script>

<style lang="scss" scoped>
.comment {
    margin-top: 30px;
    .comment:hover, .sub-comment-item:hover {
        .info {
            .reply-btn {
                opacity: 1;
            }
        }
    }
    .img {
        background: #000;
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
