import { debounce } from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            newRefresh: null
        }
    },
    mounted() {
        this.newRefresh = debounce(this.$refs.scroll.refresh, 10)

        this.itemImgListener = () => {
            this.newRefresh()
        }
        this.$bus.$on('itemImageLoad', this.itemImgListener)
    },
}

//回到顶部
export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        //点击回到顶部
        backClick() {
            //父子访问通信,拿到scroll组件的scrollTo方法
            //参数 x坐标 y坐标 返回顶部过渡事件
            this.$refs.scroll.scrollTo(0, 0, 500)
        },
    },
}