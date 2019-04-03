<template>
	<el-dialog
        title="登录"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-input v-model="form.name" placeholder="用户名"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import {Dialog, Input} from 'element-ui';

export default {
    components: {
        [Dialog.name]: Dialog,
        [Input.name]: Input,
    },
    data() {
        return {
            form: {
                name: '',
            },
            dialogVisible: true,
		};
    },
    computed: {},
    watch: {},
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        submit() {
            this.dialogVisible = false;
            this.$emit('confirm', this.form);
        }
    },
    mounted() {
    },
    beforeDestroy() {
    },
};
</script>

<style lang="scss" scope>
body .v-modal {
    opacity: 1;
    background: #fff;
}
</style>

