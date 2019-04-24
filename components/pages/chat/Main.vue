<template>
    <el-card class="box chat-box">
        <Login @confirm="login"/>
        <el-row v-if="my">
            <el-col :span="6">
                <div class="user-list">
                    <div class="item" :class="{'active': item.fd === target_user.target_fd}" v-for="item in user_list" :key="item.fd" @click="chooseTarget(item)">
                        <img src="https://blog-ico.oss-cn-shanghai.aliyuncs.com/1.jpg" />
                        <span>{{item.name}}</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="18">
                <div class="content">
					<div class="history" v-if="target_user.target_fd">
						<a @click="getLogs">历史记录</a>
					</div>
                    <div :class="{'text-right': item.source_fd === my.fd}" class="item" v-for="item in message_list" :key="item.fd">
                        <img src="https://blog-ico.oss-cn-shanghai.aliyuncs.com/1.jpg" :class="{'float-right': item.source_fd === my.fd, 'float-left': item.source_fd !== my.fd}" />
                        <div class="con">
                            <span>{{item.data.source_name}}</span>
                            <p>{{item.data.message}}</p>
                        </div>
                    </div>
                </div>
                <el-input
                    class="message"
                    type="textarea"
                    :rows="4"
                    resize="none"
                    placeholder="(ctrl + enter发送消息)"
                    v-model="target_user.message"
                    @keyup.enter.native.ctrl="push">
                </el-input>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
import {Row, Col, Input} from 'element-ui';
import Login from '@/components/pages/chat/Login';

export default {
    components: {
        [Row.name]: Row,
        [Col.name]: Col,
        [Input.name]: Input,
        Login,
    },
    data() {
        return {
            loading: false,
            user_list: [
                {
                    fd: 0,
                    name: 'example',
                }
            ],
            my: {
				fd: 0,
				name: '',
			},
            websock: null,
            target_user: {
                target_fd: 0,
                message: null,
            },
            message_list: [],
		};
    },
    methods: {
        fetchUserList() {
            this.loading = true;
            this.$axios.$get('https://wrath.cc/php/users').then((res) => {
                if (res) {
                    this.user_list = res.data.map((el) => {
                        return JSON.parse(el);
					});
					if (this.user_list.length > 1) {
						this.user_list = this.user_list.filter(user => user.fd !== this.my.fd);
					}
                }
            }).finally(() => {
                this.loading = false;
            });
        },
        chooseTarget(user) {
			this.target_user.target_fd = user.fd;
			this.target_user.source_name = this.my.name
			this.target_user.target_name = user.name
        },
        push() {
            if (!this.target_user.target_fd) {
                return this.$message.error('请选择聊天对象');
			}
			if (this.target_user.target_fd === this.my.fd) {
				return this.$message.error('请不要自言自语');
			}
			let params = Object.assign({}, this.target_user);
			this.target_user.message = null;
            this.message_list.push({
                source_fd: this.my.fd,
                data: params
			});
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
            const wsuri = 'wss://wrath.cc/ws/chat/';
            this.websock = new WebSocket(wsuri);
            this.websock.onmessage = this.websocketonmessage;
            this.websock.onclose = this.websocketclose;
        },
		websocketonmessage(e){ //数据接收
            let data = JSON.parse(e.data);
            if (data === 'fetchUserList') {
                this.fetchUserList();
                return;
            }
            if (!this.websock.fd && data) {
                this.websock.fd = data.fd;
            }
            if (data.source_fd) {
              this.message_list.push(data);
            }
        },
        websocketsend(data) {//数据发送
            this.websock.send(JSON.stringify(data));
        },
        websocketclose(e) {  //关闭
            this.$axios.delete('https://wrath.cc/php/users?name=' + this.my.name);
        },
        login(data) {
            let params = {};
            params.data = {};
            params.data.name = data.name;
            params.data.fd = this.websock.fd;
            this.my = params.data;
            this.$axios.post('https://wrath.cc/php/users', params).then((res) => {
                this.websocketsend('fetchUserList');
            });
		},
		getLogs() {
			let params = {};
			params.target_name = this.target_user.target_name;
			params.source_name = this.target_user.source_name;
			this.$axios.get('https://wrath.cc/php/chat-logs', {params}).then((res) => {
				let logs = res.data.map((el) => {
					if (el.source_name === this.my.name) {
						return {
							source_fd: this.my.fd,
							data: {
								message: el.data,
								source_name: el.source_name,
								target_name: el.target_name,
								target_fd: this.target_user.target_fd,
							}
						};
					}

					return {
						source_fd: this.target_user.target_fd,
						data: {
							message: el.data,
							source_name: el.source_name,
							target_name: el.target_name,
							target_fd: this.my.fd,
						}
					};
				});
				this.message_list = logs;
			});
		},
    },
    mounted() {
        this.initWebSocket();
    },
    beforeDestroy() {
        this.websock.onclose;
    },
};
</script>
<style>
.chat-box .el-card__body {
    padding-left: 0px !important;
}
</style>

<style lang="scss">
.box {
    width: 50%;
    margin: auto;
    .user-list {
        height: 500px;
        overflow-y: scroll;
        .item {
            height: 40px;
            line-height: 40px;
            margin: 5px 0;
            padding: 10px 0 10px 20px;
            img {
                float: left;
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
            span {
                margin-left: 10px;
            }
        }
        .active {
            background: rgb(236, 236, 236);
        }
    }
    .user-list::-webkit-scrollbar {
        width: 5px;
    }
    .user-list::-webkit-scrollbar-track {
        background-color: #fff;
    }
    .user-list::-webkit-scrollbar-thumb {
        background-color: #cecece;
    }
    .content {
        height: 425px;
        overflow-y: scroll;
        border-left: 1px solid #cecece;
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        p {
            margin: 0;
        }
        .float-left {
            float: left;
        }
        .float-right {
            float: right;
        }
        .text-right {
            text-align: right;
        }
        .item {
            margin: 10px 0;
            img {
                width: 30px;
                height: 30px;
                margin: 0 10px;
                border-radius: 50%;
            }
            .con {
                span {
                    font-weight: 100;
                    font-family: MicroSoft Yahei;
                    color: rgb(175, 174, 174);
                }
            }
        }
		.history {
			text-align: center;
			a {
				font-size: 14px;
			}
		}
    }
    .content::-webkit-scrollbar {
        width: 5px;
        position:relative;
    }
    .content::-webkit-scrollbar-track {
        background-color: #fff;
    }
    .content::-webkit-scrollbar-thumb {
        background-color: #cecece;
    }
    .message {
        background: #ddd;
    }
}

</style>

