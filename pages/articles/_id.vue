<template>
    <div class="wrap">
        <div style="display: inline;position: absolute; top: 100px;left:0px">
            <Adsense ins-style="display:inline-block;width:250px;height:728px" data-ad-client="ca-pub-1466336567692166"
                data-ad-slot="5695809452">
            </Adsense>
        </div>
        <div style="display: inline;position: absolute; top: 100px; right:0px">
            <Adsense ins-style="display:inline-block;width:250px;height:728px" data-ad-client="ca-pub-1466336567692166"
                data-ad-slot="5695809452">
            </Adsense>
        </div>
        <div style="width: 50%;margin: auto">
            <div class="top"></div>
            <el-card v-loading="loading">
                <div class="header">
                    <h1>{{ form.title }}</h1>
                    <div class="post-meta">
                        <span>
                            <i class="el-icon-view"></i>
                            {{ form.hits }}热度
                        </span>
                        <span style="margin: 0 10px">
                            <i class="el-icon-edit"></i>
                            {{ form.comment_count || 0 }}条评论
                        </span>
                        <span class="tags">
                            <i class="el-icon-document"></i>
                            {{ form.tags }}
                        </span>
                    </div>
                </div>
                <div class='markdown-body' v-html="form.html"></div>

                <InArticleAdsense data-ad-client="ca-pub-1466336567692166" data-ad-slot="7219223234">
                </InArticleAdsense>
            </el-card>
            <Comment />
        </div>
    </div>
</template>

<script>
import '@/assets/css/lines.css';
import '@/assets/css/customemin.css';
import Comment from '@/components/pages/articles/Comment';

export default {
    transition: 'page',
    head() {
        return {
            meta: this.meta,
            script: [
                { src: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js' }
            ],
            link: [
                { rel: "stylesheet", href: "https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css" }
            ]
        }
    },
    components: {
        Comment,
    },
    data() {
        return {
            loading: false,
            form: {},
            meta: [],
        };
    },
    async asyncData({ $axios, params }) {//请求
        let meta_arr = []
        let form = {}
        await $axios.$get(`seo/${params.id}`).then((res) => {
            if (!res.data) {
                return
            }
            res.data.forEach(e => {
                if (e.name == 'title') {
                    e.content += ' - Wrath‘s blog'
                }
                meta_arr.push(e)
            })
        })
        await $axios.$get(`article/${params.id}`).then((res) => {
            form = res.data
        });
        return { meta: meta_arr, form: form }
    },
    methods: {
    },
    created() {
    },
};
</script>

<style scoped lang="scss">
ins.adsbygoogle[data-ad-status="unfilled"] {
    display: none !important;
}

.wrap {
    position: relative;

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
                cursor: url(https://gilgamesh-10047150.cos.ap-shanghai.myqcloud.com/ayuda.cur), auto;
            }
        }
    }
}
</style>

