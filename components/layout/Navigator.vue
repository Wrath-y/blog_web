<template>
    <div class="navtop">
        <div class="logo"></div>
        <el-menu router class="navbar" mode="horizontal">
            <el-menu-item class="nav-index" index="/">首页</el-menu-item>
            <el-submenu :show-timeout='100' :hide-timeout='100' index="/lists">
                <template slot="title">杂七杂八的清单</template>
                <el-menu-item class="nav-music" index="/lists/musics"><a href="https://wrath.cc/music">歌单</a></el-menu-item>
                <el-menu-item class="nav-pic" index="/lists/pixivs">图片</el-menu-item>
                <el-menu-item class="nav-chat" index="/lists/chats">chat</el-menu-item>
            </el-submenu>
            <el-menu-item class="nav-message" index="/messages">留言板</el-menu-item>
            <el-menu-item class="nav-friends" index="/friends">友人帐</el-menu-item>
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
    min-width: 158px;
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
