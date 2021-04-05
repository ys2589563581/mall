<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import BScroll from '@better-scroll/core'
    import Pullup from '@better-scroll/pull-up'
    import ObserveDOM from '@better-scroll/observe-dom'
    import ScrollBar from '@better-scroll/scroll-bar'

    BScroll.use(ScrollBar)
    BScroll.use(ObserveDOM)
    BScroll.use(Pullup)
    export default {
        name: 'Scroll',
        props: {
            probeType: {
                type: Number,
                default: 0
            },
            pullUpLoad: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                scroll: null,
            }
        },
        mounted() {
            
            //1.创建BScoll对象
            this.scroll = new BScroll(this.$refs.wrapper, {
                click: true,
                //开启滚动位置监听
                probeType: this.probeType,
                //开启对 scroll 区域 DOM 改变的探测。当插件被使用后，当 scroll 的 dom 元素发生时，
                //将会触发 scroll 的 refresh 方法,也可以使用原生线方法，给Vue的prototype加$bus,
                // 在用$emit发射,$on接收监听
                observeDOM: true,

                //滚动条
                scrollbar: true,
                pullUpLoad: this.pullUpLoad
            })

            //2.监听滚动位置
            if (this.probeType == 2 || this.probeType == 3) {
                this.scroll.on('scroll', (position) => {
                    this.$emit('scroll', position)
                })
            }

            //3.监听上拉加载更多
            if (this.pullUpLoad) {
                this.scroll.on('pullingUp', () => {
                    this.$emit('pullingUp')
                })
            }
        },

        methods: {
            scrollTo(x, y, time = 300) {
                //参数 x坐标 y坐标 返回顶部过渡事件
                //防止因为异步操作，导致scroll为null而报错
                this.scroll && this.scroll.scrollTo(x, y, time)
            },
            finishPullUp() {
                this.scroll.finishPullUp()
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            },
            finishPullUp() {
                this.scroll && this.scroll.finishPullUp()
            },
            getScrollY() {
                return this.scroll ? this.scroll.y : 0
            }
        },
    }
</script>
<style scoped>

</style>