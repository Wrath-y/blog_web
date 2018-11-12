<template>
  <div>
    <el-menu class="el-menu font" mode="horizontal" @select="handleSelect">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/articles">文章</el-menu-item>
        <el-menu-item index="/time-series">归档</el-menu-item>
        <el-submenu show-timeout='100' hide-timeout='200' index="/lists">
            <template slot="title">清单</template>
                <el-menu-item index="/lists/musics">歌单</el-menu-item>
                <el-menu-item index="/lists/pixivs">图片</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-menu-item index="/comments">留言板</el-menu-item>
        <el-menu-item index="/friends">友人帐</el-menu-item>
        <el-menu-item index="/abouts">关于</el-menu-item>
    </el-menu>
    <nuxt/>
  </div>
</template>

<script>
import {Menu, MenuItem, Submenu} from 'element-ui';

export default {
    components: {
        [Menu.name]: Menu,
        [MenuItem.name]: MenuItem,
        [Submenu.name]: Submenu,
    },
    data() {
        return {
		};
    },
    computed: {},
    watch: {},
    methods: {
        handleSelect(key) {
            this.$router.push(key);
        },
    },
    mounted() {
    },
    beforeDestroy() {
    },
};
</script>

<style>
.font {
    font-family: 'Source Han Serif SC','Source Han Serif','source-han-serif-sc','PT Serif','SongTi SC','MicroSoft Yahei',Georgia,serif;
}
</style>