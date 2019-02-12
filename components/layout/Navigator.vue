<template>
    <div class="navtop">
        <div class="logo"></div>
        <el-menu router class="navbar" mode="horizontal">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/time-series">归档</el-menu-item>
            <el-submenu :show-timeout='100' :hide-timeout='100' index="/lists">
                <template slot="title">清单</template>
                <el-menu-item index="/lists/musics"><a href="https://ysama.cn/music">歌单</a></el-menu-item>
                <el-menu-item index="/lists/pixivs">图片</el-menu-item>
                <el-menu-item index="/lists/chats">chat</el-menu-item>
            </el-submenu>
            <el-menu-item index="/articles/1">留言板</el-menu-item>
            <el-menu-item index="/harems">友人帐</el-menu-item>
            <el-menu-item index="/abouts">关于</el-menu-item>
        </el-menu>
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
    methods: {},
    mounted() {
    },
    beforeDestroy() {
    },
};
</script>

<style lang="scss">
.navtop {
    position: fixed;
    width: 100%;
    z-index: 9999;
}
.navbar {
    font-family: 'Source Han Serif SC','Source Han Serif','source-han-serif-sc','PT Serif','SongTi SC','MicroSoft Yahei',Georgia,serif;
    display: flex;
    justify-content: center;
}
.el-menu .el-submenu, .el-menu--horizontal .el-menu--popup {
    min-width: 80px;
    border-radius: 8px;
    overflow: hidden;
    .el-menu-item {
        text-align: center;
    }
	.el-menu-item:hover {
		color: #e67474 !important;
		text-decoration: none;
		cursor: url(https://gilgamesh-10047150.cos.ap-shanghai.myqcloud.com/ayuda.cur),auto;
	}
}
</style>
