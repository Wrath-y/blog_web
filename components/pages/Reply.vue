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
        <div class="buttom-btn">
            <el-button class="submit-btn" @click="submit">点击就送...</el-button>
            <el-button v-if="this.row" class="cancel-btn" @click="$emit('cancel')">CANCEL</el-button>
        </div>
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
                content: this.reply_to ? this.reply_to + '  ' : '',
                article_id: Number(this.$route.params.id),
                pid: this.pid,
                ppid: this.ppid
            },
		};
    },
    props: ['row', 'reply_to', 'pid', 'ppid'],
    methods: {
        submit() {
            this.loading = true;
            this.$axios.post('comments', this.form).then((res) => {
                this.$message.success('发送成功');
            }).finally(() => {
                this.loading = false;
                this.$emit('cancel')
            });
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
    .content {
        margin-top: 10px;
    }
    .buttom-btn {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }
}
</style>

