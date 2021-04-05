<template>
    <div class="toast" v-show="isshow">
        <div>{{message}}</div>
    </div>
</template>
<script>
export default {
    name:'Toast',
    props:{
        /* message:{
            type:String,
            default:''
        },
        Show:{
            type:Boolean,
            default:false
        } */
    },
    data() {
        return {
            message:'',
            isshow:false,
        }
    },
    methods: {
        show(message,duration=1500){
            this.isshow=true
            this.message=message

            setTimeout(()=>{
                this.isshow=false,
                this.message=''
            },duration)
        }
    },
}
</script>
<style scoped>
    .toast{
        position: fixed;
        width: 150px;
        height: 50px;
        top:50%;
        left:50%;
        background-color: rgba(0, 0, 0, .7);
        transform: translateX(-50%);
        text-align: center;
        line-height: 50px;
        color: #fff;
        font-size: 18px;
        font-weight: bold;
        z-index: 9999;
    }
</style>