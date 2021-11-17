<template>
	<el-card>
        <no-ssr>
            <waterfall id="gallery" style="margin-top: 61px" :col="col" :data="list" @loadmore="fetchList">
                <div class="cell-item" v-for="(item, index) in list" :key="index">
                    <img :key="index" v-lazy="`${item.Key}?x-oss-process=image/resize,l_300`" width="98%" :data-resource="item.Key"/>
                </div>
            </waterfall>
        </no-ssr>
    </el-card>
</template>

<script>
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

export default {
    components: {},
    data() {
        return {
            list: [],
            col:5,
            form: {
                page_size: 15,
                next_marker: "",
            },
            view: null,
		};
    },
    methods: {
        async fetchList() {
            console.log(1);
            await this.$axios.get('https://wrath.cc/go/pixivs?' + this.toQuery(this.form)).then((res) => {
                if (res) {
                    this.list = this.list.concat(res.data.Objects.map((i) => {
                        i.Key = 'https://wrath-pixiv.oss-cn-shanghai.aliyuncs.com/' + this.encodeUrl(i.Key);
                        return i;
                    }));
                    this.form.next_marker = res.data.NextMarker
                }
            });
            if (this.view) {
                this.view.destroy();
            }
            this.view = new Viewer(document.getElementById('gallery'), {
                url: "data-resource",
                toolbar: {
                    zoomIn: 4,
                    zoomOut: 4,
                    oneToOne: 4,
                    reset: 4,
                    prev: 4,
                    next: 4,
                    rotateLeft: 4,
                    rotateRight: 4,
                    flipHorizontal: 4,
                    flipVertical: 4,
                },
            });
        },
        encodeUrl(str) {
            str = encodeURIComponent(str);
            str = str.replace(/\+/g, '%2B');
            return str;
        },
        toQuery(json) {
            return Object.keys(json).map(function (key) {
                return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
            }).join("&");
        },
    },
    mounted() {
        this.fetchList();
    },
};
</script>

<style scope lang="scss">
#gallery {
    text-align: center;
}
</style>
