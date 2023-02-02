<template>
    <div class="wrap">
        <div class="top"></div>
        <el-card class="card">
            <div class="box">
                <a class="item" v-for="item in list" :key="item.name" :href="item.url" target="_blank">
                    <img :src="item.image" />
                    <span class="name">{{item.name}}</span>
                </a>
            </div>
        </el-card>
    </div>
</template>

<script>
import md5 from 'md5';

export default {
    transition: 'page',
    components: {},
    data() {
        return {
            loading: false,
			list: [],
		};
    },
    methods: {
        fetchList() {
            this.loading = true;
            this.$axios.$get('friends').then((res) => {
                if (res.data) {
                    this.list = res.data.map((el) => {
						el.image = 'https://www.gravatar.com/avatar/' + md5(el.email || 'example');
						return el;
					});
                }
            }).finally(() => {
                this.loading = false;
            });
        },
    },
    mounted() {
        this.fetchList();
    },
};
</script>

<style lang="scss" scoped>
.wrap {
    .top {
        padding: 40px 0;
    }
    .card {
        width: 40%;
        margin: auto;
        .box {
            width: 100%;
            .item {
                display: inline-block;
                width: 33%;
                margin-bottom: 25px;
                img {
                    float: left;
                    margin-right: 10px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }
                .name {
                    line-height: 50px;
                }
            }
        }
    }
}
</style>

