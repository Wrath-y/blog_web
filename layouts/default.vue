<template>
  <div>
    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="/articles">文章</el-menu-item>
      <el-menu-item index="2">图片</el-menu-item>
    </el-menu>
    <nuxt/>
  </div>
</template>

<script>
import {Menu, MenuItem} from 'element-ui';

export default {
    components: {
        [Menu.name]: Menu,
        [MenuItem.name]: MenuItem,
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
