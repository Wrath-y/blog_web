<template>
    <div>
        <div class="headertop trans filter-dot">
            <div class="header-bg-box">
                <img class="header-bg-img" src="../assets/images/header.png" />
            </div>
        </div>
        <div class="list">
            <div class="main-content">
                
            </div>
        </div>
    </div>
</template>

<script>
import Logo from '~/components/Logo.vue';
import {Table, TableColumn, Pagination} from 'element-ui';

export default {
    transition: 'page',
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Pagination.name]: Pagination,
        Logo,
    },
    data() {
        return {
            loading: false,
		};
    },
    methods: {},
}
</script>

<style scoped lang="scss">
.headertop.filter-dot::before {
    background-image: url('../assets/images/dot.gif')
}
.headertop {
    height: auto;
    position: relative;
    overflow: hidden;
}
.headertop::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    background-attachment: fixed;
}
.header-bg-box {
    height: 938px;
    overflow: hidden;
}
.header-bg-img {
    width: 100%;
}
.list {
    display: flex;
    justify-content: center;
}
.trans {
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: none;
    animation-play-state: running;
}
</style>
