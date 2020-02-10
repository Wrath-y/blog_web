<template>
    <div class="wrap">
        <div class="top"></div>
        <el-card v-loading="loading">
            <div class="header">
                <h1>{{form.title}}</h1>
                <div class="post-meta">
                    <span>
                        <i class="el-icon-view"></i>
                        {{form.hits}}热度
                    </span>
                    <span style="margin: 0 10px">
                        <i class="el-icon-edit"></i>
                        {{form.commentCount || 0}}条评论
                    </span>
                    <span class="tags">
                        <i class="el-icon-document"></i>
                        {{form.tags}}
                    </span>
                </div>
            </div>
            <div v-html="form.html"></div>
        </el-card>
        <Comment />
    </div>
</template>

<script>
import '@/assets/css/lines.css';
import '@/assets/css/customemin.css';
import axios from 'axios'
import Comment from '@/components/pages/articles/Comment';

export default {
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
            form: {}
        };
    },
    async asyncData (context) {
        let { data } = await axios.get(`https://wrath.cc/java/articles/${context.route.params.id}`);
        return { form: data, loading: false }
    },
};
</script>

<style scoped lang="scss">
.wrap {
    width: 50%;
    margin: auto;
    .top {
        padding-top: 81px;
    }
    .header {
        margin-bottom: 20px;
        text-align: center;
        .post-meta {
            margin-bottom: 15px;
            width: 100%;
            color: #888;
            font-size: 12px;
            .tags:hover {
                color: #e67474;
                cursor: url(https://gilgamesh-10047150.cos.ap-shanghai.myqcloud.com/ayuda.cur),auto;
            }
        }
    }
}
</style>

