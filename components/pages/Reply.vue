<template>
    <div class="reply">
        <div class="user-info">
            <el-input v-model="form.name" placeholder="昵称(必须✔️)" />
            <el-input style="margin: 0 10px" v-model="form.email" placeholder="邮箱(必须✔️)" />
            <el-input v-model="form.url" placeholder="网站(选填)" />
        </div>
        <div class="content">
            <el-input
                type="textarea"
                :autosize="{ minRows: 6 }"
                placeholder="你有什么想对我说的..."
                v-model="form.content" />
        </div>
        <el-button class="btn" @click="submit">点击就送...</el-button>
    </div>
</template>

<script>
import {Input} from 'element-ui';

export default {
    components: {
        [Input.name]: Input,
    },
    data() {
        return {
            loading: false,
            form: {
                name: '',
                email: '',
                url: '',
                content: '',
            },
		};
    },
    methods: {
        submit() {
            this.loading = true;
            this.$axios.post('comments', this.form).then((res) => {
                console.log(res);
                this.$message.success('发送成功');
            }).finally(() => this.loading = false);
        }
    },
};
</script>
<style lang="scss" scoped>
.reply {
    margin-top: 15px;
    .user-info {
        display: flex;
        justify-content: center;
    }
    .content, .btn {
        margin-top: 10px;
    }
}
</style>

