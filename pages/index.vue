<template>
    <div>
        <div class="headertop trans filter-dot">
            <div class="header-bg-post">
                <img class="header-bg-img" src="https://ysama.oss-cn-hongkong.aliyuncs.com/header.png" />
            </div>
        </div>
        <div class="list" v-loading="loading">
            <div class="main-content">
                <el-card v-for="(item, index) in list" :key="index" class="post-card">
                    <div class="post-image" :class="{'float-right': index % 2 !== 0}">
                        <img :src="item.image" />
                    </div>
                    <div class="post-con" :class="{'float-right': index % 2 == 0}">
                        <div class="post-date" :class="{'text-right': index % 2 == 0}">
                            <i class="el-icon-time"></i>
                            {{getNowFormatDate(item.createdAt)}}
                        </div>
                        <nuxt-link :to="`/articles/${item.id}`">
                            <a href="#">
                                <h3>{{item.title}}</h3>
                            </a>
                        </nuxt-link>
                        <div class="post-meta" :class="{'text-right': index % 2 == 0}">
                            <span>
                                <i class="el-icon-view"></i>
                                {{item.hits}}热度
                            </span>
                            <span style="margin: 0 10px">
                                <i class="el-icon-edit"></i>
                                {{item.commentCount || 0}}条评论
                            </span>
                            <span class="tags" @click="chooseTag(item.tags)">
                                <i class="el-icon-document"></i>
                                {{item.tags}}
                            </span>
                        </div>
                        <div class="post-intro">
                            <p>{{item.con}}</p>
                        </div>
                        <div class="post-bottom" :class="{'text-right': index % 2 == 0}">
                            <nuxt-link :to="`/articles/${item.id}`">
                                <a href="#">
                                    <i class="el-icon-more"></i>
                                </a>
                            </nuxt-link>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import {Table, TableColumn} from 'element-ui';
import axios from 'axios'

export default {
    transition: 'page',
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
    },
    data() {
        return {
            form: {},
            list: [],
            page: 0,
            loading: false,
		};
    },
    methods: {
        async fetchList() {
            if (this.list.length) {
                this.form.lastId = this.list[this.list.length - 1]['id'];
            }
            let params = this.form;
            await this.$axios.$get('articles', {params}).then((res) => {
                if (res) {
                    res.map((i) => {
                        this.list = this.list.filter((j) => {
                            return i.id != j.id;
                        });
                    });
                    this.list = this.list.concat(res);
                }
            });
        },
        getNowFormatDate(timetsamp) {
            const date = new Date(timetsamp);
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = '0' + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = '0' + strDate;
            }
            const trueDate = date.getFullYear() + '年' + month + '月' + strDate
                    + '日 ' + date.getHours() + ':' + date.getMinutes()
                    + ':' + date.getSeconds();
            return trueDate;
        },
        scrolls() {
            if (parseInt(document.documentElement.scrollTop/1500) > this.page) {
                this.fetchList();
                this.page = this.page + 1;
            }
        },
        chooseTag(tag) {
            this.list = [];
            this.form = {};
            this.lastId = 0;
            this.form.tag = tag;
            this.fetchList();
        }
    },
    created() {
        this.fetchList();
    },
    mounted() {
        window.addEventListener('scroll', this.scrolls, true)
    },
}
</script>

<style scoped lang="scss">
.headertop.filter-dot::before {
    background-image: url('https://blog-ico.oss-cn-shanghai.aliyuncs.com/dot.gif')
}
.headertop {
    max-height: 938px;
    position: relative;
    overflow: hidden;
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
.header-bg-post {
    max-height: 938px;
    overflow: hidden;
}
.header-bg-img {
    width: 100%;
}
.trans {
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: none;
    animation-play-state: running;
}
.list {
    display: flex;
    justify-content: center;
    .main-content {
        .post-card {
            width: 780px;
            height: 300px;
            border-radius: 10px;
            padding: 0;
            margin: 40px 0;
            .post-image {
                display: inline-block;
                width: 429px;
                overflow: hidden;
                img {
                    width: 429px;
                    height: 300px;
                }
            }
            .post-con {
                display: inline-block;
                width: 279px;
                height: 251px;
                padding: 24px 36px;
                .post-date, .post-meta {
                    width: 100%;
                    color: #888;
                    font-size: 12px;
                }
                .post-meta {
                    margin-bottom: 15px;
                    span {
                        width: 33.3%;
                    }
                    .tags:hover {
                        color: #e67474;
                        cursor: url(https://gilgamesh-10047150.cos.ap-shanghai.myqcloud.com/ayuda.cur),auto;
                    }
                }
                .post-intro {
                    color: rgba(0,0,0,.66);
                    margin-bottom: 15px;
                    p {
                        position:relative;
                        margin: 0;
                        line-height: 30px;
                        font-size: 16px;
                        overflow : hidden;
                        // text-overflow: ellipsis;
                        // display: -webkit-box;
                        // -webkit-line-clamp: 3;
                        // -webkit-box-orient: vertical;
                        height: 87.5px;
                    }
                    p::after {
                        content:"...";
                        font-weight:bold;
                        position:absolute;
                        bottom:0;
                        right:0;
                        padding:0 20px 1px 45px;
                        background:url(https://blog-ico.oss-cn-shanghai.aliyuncs.com/ellipsis_bg.png) repeat-y;
                    }
                }
                h3 {
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    word-wrap: break-word;
                    margin: 10px 0 14px 0;
                }
                .post-bottom {
                    font-size: 26px;
                    color: rgb(102, 102, 102);
                    a {
                        padding: 10px 0;
                    }
                }
            }
        }

    }
}
.float-right {
    float: right;
}
.text-right {
    text-align: right;
}
</style>
<style lang="scss">
.list {
    .main-content {
        .el-card__body {
            padding: 0;
            height: 300px;
        }
    }
}
</style>

