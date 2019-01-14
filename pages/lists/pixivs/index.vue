<template>
	<el-card>
        <no-ssr>
            <waterfall style="margin-top: 61px" :col="col" :data="list" @loadmore="fetchList">
                <div class="cell-item" v-for="(item, index) in list" :key="index">
                    <img v-lazy="item.Key" width="98%" />
                </div>
            </waterfall>
        </no-ssr>
    </el-card>
</template>

<script>
export default {
    transition: 'page',
    components: {},
    data() {
        return {
            list: [],
            col:5,
            form: {
                page_size: 15,
                next_marker: "",
            },
		};
    },
    computed: {},
    watch: {},
    methods: {
        async fetchList() {
            await this.$axios.get('http://localhost:8081/pixivs?' + this.toQuery(this.form)).then((res) => {
                if (res) {
                    this.list = this.list.concat(res.Data.Objects.map((i) => {
                        i.Key = 'https://gilgamesh.oss-cn-hongkong.aliyuncs.com/' + this.encodeUrl(i.Key) + '?x-oss-process=image/resize,l_300';
                        return i;
                    }));
                    this.form.next_marker = res.Data.NextMarker
                }
            });
        },
        encodeUrl(str) {
            str = encodeURI(str);
            str = str.replace(/\+/g, '%2B');
            return str;
        },
        toQuery(json) {
            return Object.keys(json).map(function (key) {
                return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
            }).join("&");
        }
    },
    mounted() {
        this.fetchList();
    },
    beforeDestroy() {
    },
};
</script>

<style scope lang="scss">
.cell-item {
    text-align: center;
}
</style>
