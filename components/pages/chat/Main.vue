<template>
    <el-card class="box">
        <el-row>
            <el-col :span="6">
                <div class="user-list">
                    <div class="item" v-for="item in user_list" :key="item.fd">
                        <img src="" />
                        <span>{{item.name}}</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="18">
                <div class="content"></div>
                <el-input
                    class="message"
                    type="textarea"
                    :rows="3"
                    placeholder="(ctrl + enter发送消息)"
                    v-model="message"
                    @keyup.enter.native.ctrl="submit">
                </el-input>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
import {Row, Col, Input} from 'element-ui';

export default {
    components: {
        [Row.name]: Row,
        [Col.name]: Col,
        [Input.name]: Input,
    },
    data() {
        return {
            loading: false,
            user_list: [
                this.my,
            ],
            target_user: null,
            message_list: [],
            message: null,
		};
    },
    props: ['my', 'ws'],
    methods: {
        fetchUserList() {
            this.loading = true;
            this.$axios.$get('users').then((res) => {
                this.user_list = res.map((el) => {
                    return JSON.parse(el);
                });
            }).finally(() => {
                this.loading = false;
            });
        },
        submit() {
            if (!this.target_user) {
                return this.$message.error('请选择聊天对象');
            }
            let params = {};
            params = this.my;
            params.message = this.message;
            this.message_list.push(params);
            this.ws.send(JSON.stringify(params));
        }
    },
    mounted() {
        this.fetchUserList();
    },
};
</script>
<style lang="scss" scoped>
.box {
    width: 50%;
    margin: auto;
    .user-list {
        .item {
            height: 40px;
            line-height: 40px;
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
    }
    .content {
        padding: 50px;
        background: rgb(82, 78, 78);
    }
    .message {
        background: #ddd;
    }
}

</style>

