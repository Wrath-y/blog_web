<template>
	<el-card>
        <el-table :data="list" v-loading="loading" size="mini">
            <el-table-column prop="id" label="ID" width="100"/>
        </el-table>
    </el-card>
</template>

<script>
import {Table, TableColumn, Pagination} from 'element-ui';

export default {
    transition: 'page',
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Pagination.name]: Pagination,
    },
    data() {
        return {
            loading: false,
			list: [
				{
					id: 3,
				},
				{
					id: 4,
				}
			],
		};
    },
    computed: {},
    watch: {},
    methods: {
    },
    mounted() {
    },
    beforeDestroy() {
    },
};
</script>

