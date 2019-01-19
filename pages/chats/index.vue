<template>
	<el-card>
        <Login @confirm="login"/>
        <div class="top"></div>
        <el-button @click="push">发送</el-button>
    </el-card>
</template>

<script>
import Login from '@/components/pages/chat/Login';

export default {
    components: {
        Login
    },
    data() {
        return {
            form: {
                name: '',
                message: 'message',
            },
            websock: null,
            list: [],
		};
    },
    computed: {},
    watch: {},
    methods: {
        push() {
            let params = {
                target_id: this.websock.target_id || 0,
                data: this.form.message
            };
            //若是ws开启状态
            if (this.websock.readyState === this.websock.OPEN) {
                this.websocketsend(params)
            }
            // 若是 正在开启状态，则等待300毫秒
            else if (this.websock.readyState === this.websock.CONNECTING) {
                let that = this;//保存当前对象this
                setTimeout(function () {
                    that.websocketsend(params)
                }, 300);
            }
            // 若未开启 ，则等待500毫秒
            else {
                this.initWebSocket();
                let that = this;//保存当前对象this
                setTimeout(function () {
                    that.websocketsend(params)
                }, 500);
            }
        },
        initWebSocket() { //初始化weosocket
            //ws地址
            const wsuri = 'ws://127.0.0.1:9501';
            this.websock = new WebSocket(wsuri);
            this.websock.onmessage = this.websocketonmessage;
            this.websock.onclose = this.websocketclose;
        },
        websocketonmessage(e){ //数据接收
            let data = JSON.parse(e.data);
            if (!this.websock.fd && data) {
                this.websock.fd = data.fd;
            }
            console.log(data);
        },
        websocketsend(data) {//数据发送
            this.websock.send(JSON.stringify(data));
        },
        websocketclose(e) {  //关闭
            console.log("connection closed (" + e.code + ")");
        },
        login(data) {
            this.form.name = data.name;
            let params = {};
            params = this.form;
            params.fd = this.websock.fd;
            this.$axios.$get('users', {params}).then((res) => {
                console.log(res);
            });
        },
    },
    mounted() {
        this.initWebSocket();
    },
    beforeDestroy() {
    },
};
</script>

<style lang="scss" scoped>
.top {
    padding-top: 51px;
}
</style>

