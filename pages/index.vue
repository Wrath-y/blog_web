<template>
    <div>
        <div class="headertop trans filter-dot">
            <div class="header-bg-post">
                <img class="header-bg-img" src="../assets/images/header.png" />
            </div>
        </div>
        <div class="list">
            <div class="main-content">
                <el-card v-for="(item, index) in list" :key="index" class="post-card">
                    <div class="post-image" :class="{'float-right': index % 2 !== 0}">
                        <a href="">
                            <img :src="item.image" />
                        </a>
                    </div>
                    <div class="post-con" :class="{'float-right': index % 2 == 0}">
                        <div class="post-date" :class="{'text-right': index % 2 == 0}">
                            <i class="el-icon-time"></i>
                            发布于 2018-11-15
                        </div>
                        <a href="">
                            <h3>YSAMAのblog</h3>
                        </a>
                        <div class="post-meta" :class="{'text-right': index % 2 == 0}">
                            <span>
                                <i class="el-icon-view"></i>
                                2175热度
                            </span>
                            <span style="margin: 0 10px">
                                <i class="el-icon-edit"></i>
                                9条评论
                            </span>
                            <span>
                                <i class="el-icon-document"></i>
                                野生技术协会
                            </span>
                        </div>
                        <div class="post-intro">
                            <p>
                               喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵？？？
                            </p>
                        </div>
                        <div class="post-bottom" :class="{'text-right': index % 2 == 0}">
                            <a href="">
                                <i class="el-icon-more"></i>
                            </a>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import Logo from '~/components/Logo.vue';
import {Table, TableColumn, Pagination} from 'element-ui';

export default {
    transition: 'page',
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Pagination.name]: Pagination,
        Logo,
    },
    data() {
        return {
            list: [
                {
                    id: 1,
                    image: 'http://p92qvcq1g.bkt.clouddn.com/38947047.jpg',
                }, {
                    id: 2,
                    image: 'http://p92qvcq1g.bkt.clouddn.com/38947047.jpg',
                }, {
                    id: 3,
                    image: 'http://p92qvcq1g.bkt.clouddn.com/38947047.jpg',
                }
            ],
            loading: false,
		};
    },
    methods: {},
}
</script>

<style scoped lang="scss">
.headertop.filter-dot::before {
    background-image: url('../assets/images/dot.gif')
}
.headertop {
    height: auto;
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
    height: 938px;
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
                height: 300;
                overflow: hidden;
                img {
                    width: 429px;
                }
            }
            .post-con {
                display: inline-block;
                width: 279px;
                padding: 24px 36px;
                .post-date, .post-meta {
                    width: 100%;
                    color: #888;
                    font-size: 12px;
                }
                .post-meta {
                    span {
                        width: 33.3%;
                    }
                }
                .post-intro {
                    color: rgba(0,0,0,.66);
                    margin-top: 15px;
                    p {
                        font-size: 16px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                        height: 67.5px;
                        overflow: hidden;
                    }
                }
                h3 {
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    word-wrap: break-word;
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
        }
    }
}
</style>

