<template>
    <div class="cart">
        <!-- 导航 -->
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{cartLength}})</div>
        </nav-bar>
        <!-- 商品列表 -->
        <scroll class="content" ref="scroll">
            <cart-list></cart-list>
        </scroll>
        <!-- 底部汇总 -->
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>
<script>
    import NavBar from 'components/common/navbar/NavBar'
    import CartList from './childComps/CartList'
    import Scroll from 'components/common/scroll/Scroll'
    import CartBottomBar from './childComps/CartBottomBar'

    //转换为计算属性
    import { mapGetters } from 'vuex'

    export default {
        name: 'Cart',
        components: {
            NavBar,
            CartList,
            Scroll,
            CartBottomBar
        },
        computed: {
            // 语法1
            ...mapGetters(['cartLength'])

            //语法2
            /* ...mapGetters({
                //另取名
                length:'cartLength',
                abc:'carList'
            }) */
        },
        activated() {
            this.$refs.scroll.refresh()
        },
    }
</script>
<style scoped>
    .nav-bar {
        background-color: var(--color-high-text);
        color: #fff;
        font-weight: bold;
    }

    .cart {
        height: 100vh;
        position: relative;
    }
    .content{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 89px;
        top: 44px;
        overflow: hidden;
    }
</style>