<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref="nav"></detail-nav-bar>
        <scroll class="content" ref="scroll" :probe-type='3' @scroll='contentScroll'>
            <detail-swiper :top-images='topImages'></detail-swiper>
            <detail-base-info :goods='goods'></detail-base-info>
            <detail-shop-info :shop='shop'></detail-shop-info>
            <detail-goods-info :detail-info='detailInfo' @detailImageLoad='detailImageLoad'></detail-goods-info>
            <detail-param-info ref="params" :paramInfo='paramInfo'></detail-param-info>
            <detail-comment-info ref="comment" :commentInfo='commentInfo'></detail-comment-info>
            <goods-list ref="recommend" :goods='recommends'></goods-list>
        </scroll>
        <detail-bottom-bar @addCart='addToCart'></detail-bottom-bar>
        <back-top @click.native='backClick' v-show="isShowBackTop"></back-top>
        <!-- <toast :message='message' :Show='show'></toast> -->
    </div>
</template>
<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import DetailBottomBar from './childComps/DetailBottomBar'


    import Scroll from 'components/common/scroll/Scroll'
    import GoodsList from 'components/content/goods/GoodsList'


    import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'
    // 导入混入
    import { itemListenerMixin, backTopMixin } from 'common/mixin'
    import { debounce } from 'common/utils'

    import { mapActions } from 'vuex';

    // import Toast from 'components/common/toast/Toast';

    export default {
        name: 'Detail',
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            Scroll,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList,
            DetailBottomBar,
           /*  Toast, */
        },
        mixins: [itemListenerMixin, backTopMixin],
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],
                themeTopYs: [],
                getThemeTopY: null,
                currentIndex: 0,
                /* message:'',
                show:false */
            }
        },
        methods: {
            //映射
            ...mapActions(['addCart']),

            detailImageLoad() {
                //混入mixin
                this.newRefresh()
                //等待图片加载完成获取
                this.getThemeTopY()
            },
            titleClick(index) {
                this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
            },
            //监听滚动
            contentScroll(position) {
                //获取y值
                const positionY = -position.y

                //2.positionY与标题的offset值进行对比
                let length = this.themeTopYs.length

                //普通做法
                /* for (let i = 0; i < length; i++) {
                    if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] &&
                        positionY < this.themeTopYs[i + 1])
                        || (i == length - 1 && positionY > this.themeTopYs[i]))) {
                        this.currentIndex = i
                        this.$refs.nav.currentIndex=this.currentIndex
                    }
                } */

                //向数组最后push一个Number.MAX_VALUE最大数值
                for (let i = 0; i < length - 1; i++) {
                    if (this.currentIndex !== i && (positionY > this.themeTopYs[i]
                        && positionY < this.themeTopYs[i + 1])) {
                        this.currentIndex = i
                        this.$refs.nav.currentIndex = this.currentIndex
                    }
                }
                //是否显示隐藏回到顶部按钮
                this.isShowBackTop = position.y < -2000 ? true : false
            },

            //加入购物车
            addToCart() {
                //1.获取购物车需要展示的商品信息
                const product = {}
                product.image = this.topImages[0]
                product.title = this.goods.title
                product.desc = this.goods.desc
                product.price = this.goods.newPrice
                product.iid = this.iid
                product.realPrice = this.goods.realPrice

                //将商品添加到购物车
               /*  this.$store.dispatch('addCart', product).then(res => {
                    console.log(res);
                }) */

                //使用映射方式添加购物车
                this.addCart(product).then(res => {
                    /* this.show=true
                    this.message=res

                    setTimeout(()=>{
                        this.show=false
                        this.message=''
                    },1500) */
                    
                     this.$toast.show(res,2000)
                })
            }


        },
        mounted() {

        },
        destroyed() {
            this.$bus.$off('itemImageLoad', this.itemImgListener)
        },
        created() {
            //保存请求的iid
            this.iid = this.$route.params.iid
            //2.根据iid请求的详情数据
            getDetail(this.iid).then(res => {
                const data = res.result
                //1.获取顶部轮播图片数据u
                this.topImages = data.itemInfo.topImages
                //获取商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

                //获取店铺信息
                this.shop = new Shop(data.shopInfo)

                //商品详情数据
                this.detailInfo = data.detailInfo

                //商品参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

                //评论信息
                if (data.rate.cRate !== 0) {
                    this.commentInfo = data.rate.list[0]
                }

                //请求推荐数据
                getRecommend().then(res => {
                    this.recommends = res.data.list
                })

                //给getThemeTopY赋值(对this.themeTopYs赋值操作间进行防抖)
                this.getThemeTopY = debounce(() => {
                    if (this.$refs.recommend !== undefined) {
                        this.themeTopYs = []
                        ///商品
                        this.themeTopYs.push(0)
                        //参数(所有组件都有$el，它可以拿到组件内标签)
                        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                        // 评论
                        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                        // 推荐
                        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                        this.themeTopYs.push(Number.MAX_VALUE)

                    }
                }, 200)

                //在下次 DOM 更新循环结束之后执行延迟回调。
                /* this.$nextTick(() => {
                    //根据最新的数据，对应的DOM是已经被渲染出来了
                    //但是图片依然是没有加载完(目前获取到的offsetTop不包含图片)
                    //一般offsetTop都是因为图片问题
                    this.themeTopYs=[]
                    ///商品
                    this.themeTopYs.push(0)
                    //参数(所有组件都有$el，它可以拿到组件内标签)
                    this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                    // 评论
                    this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                    // 推荐
                    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                    console.log(this.themeTopYs);
                }) */
            })
        },
    }
</script>
<style scoped>
    #detail {
        height: 100vh;
        position: relative;
        z-index: 9999;
        background-color: #fff;
        overflow: hidden;
    }

    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }

    .content {
        position: absolute;
        left: 0;
        right: 0;
        top: 44px;
        bottom: 58px;
    }
</style>