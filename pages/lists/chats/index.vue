<template>
	<el-card>
        <div class="top"></div>
        <Main />
    </el-card>
</template>

<script>
import Main from '@/components/pages/chat/Main';

export default {
    components: {
        Main
    },
    data() {
        return {
            form: {
                name: '',
                message: 'message',
            },
            my: {
                name: '',
                fd: 0,
            },
            websock: null,
            list: [],
		};
    },
    computed: {},
    watch: {},
    methods: {},
    mounted() {},
    beforeDestroy() {
    },
};
</script>

<style lang="scss" scoped>
.top {
    padding-top: 51px;
}
</style>

