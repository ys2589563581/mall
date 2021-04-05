<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button class="check-button" :is-checked='isSelectAll' @click.native='checkClick'></check-button>
            <span>全选</span>
        </div>
        <div class="price">
            合计:{{totalPrice}}
        </div>
        <div :class="{cacluate:checkColors}" class="cacl" @click='calcClick'>
            <span>
                去结算: {{checkLength}}
            </span>
        </div>
    </div>
</template>
<script>
    import CheckButton from 'components/content/checkButton/CheckButton'
    import { mapGetters } from 'vuex'
    export default {
        name: 'CartBottomBar',
        components: {
            CheckButton,
        },
        data() {
            return {
                checkColor: false
            }
        },
        computed: {
            ...mapGetters(['cartList']),
            totalPrice() {
                return '￥' + this.cartList.filter(item => {
                    return item.checked
                }).reduce((preValue, item) => {
                    return preValue + item.realPrice * item.count
                }, 0).toFixed(2)
            },
            checkLength() {
                return this.cartList.filter(item => {
                    return item.checked
                }).reduce((preValue, item) => {
                    return preValue + item.count
                }, 0)
            },
            isSelectAll() {
                //值为0就是false 当item.checked都为true时，find返回undefined
                if (this.cartList.length) {
                    return !this.cartList.find(item => !item.checked)
                }
            },
            checkColors() {
                //判断结算颜色
                if (this.cartList.length) {
                    return this.checkColor = this.cartList.find(item => item.checked)
                }
            }
        },
        methods: {
            checkClick(){
                if(this.isSelectAll){//全部选中
                    this.cartList.forEach(item=>item.checked=false)
                }else{//有选中的，但没有全部选中
                    this.cartList.forEach(item=>item.checked=true)
                }
            },
            calcClick(){
                if(!this.isSelectAll){
                    this.$toast.show('请选择购买商品',2000)
                }
            }
        },
    }
</script>
<style scoped>
    .bottom-bar {
        display: flex;
        height: 50px;
        background-color: #eee;
        position: absolute;
        bottom: 40px;
        left: 0;
        right: 0;
        justify-content: space-between;
        justify-items: center;
        text-align: center;
    }

    .check-content {
        display: flex;
        margin-top: 12px;
    }

    .check-button {
        width: 20px;
        height: 20px;
        margin: 0 5px 0 10px;
    }

    .price {
        margin-top: 12px;
        margin-left: 30px;
    }

    .cacl {
        height: 50px;
        padding: 0 10px;
        float: right;
        background-color: slategrey;
    }

    .cacl span {
        display: inline-block;
        margin-top: 12px;
        font-size: 16px;
        color: #fff;
        font-weight: bold;
    }

    .cacluate {
        background-color: red;
    }
</style>