<template>
    <!-- 当没有信息不展示 -->
    <div v-if="Object.keys(goods).length!==0" class="base-info">
        <!-- 标题 -->
        <div class="info-title">{{goods.title}}</div>
        <!-- 价格 -->
        <div class="info-price">
            <span class="n-price">{{goods.newPrice}}</span>
            <span class="o-price">{{goods.oldPrice}}</span>
            <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
        </div>
        <!-- 快递信息 -->
        <div class="info-other">
            <span>{{goods.columns[0]}}</span>
            <span>{{goods.columns[1]}}</span>
            <span>{{goods.services[goods.services.length-1].name}}</span>
        </div>
        <!-- 无理由退货 -->
        <div class="info-service">
            <span class="info-service-item" v-for= "index in goods.services.length-1" :key="index">
                <img :src="goods.services[index].icon">
                <span>{{goods.services[index-1].name}}</span>
            </span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'DetailBaseInfo',
        props: {
            goods: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
    }
</script>
<style scoped>
    .base-info{
        margin-top: 15px;
        padding: 0 8px;
        color: #999;
        border-bottom: 5px solid #f2f5f8;
    }
    .info-title{
        color: #222;
        font-size: 17px;
        font-weight:bolder;
    }
    .info-price{
        margin-top: 10px;
        position: relative;
    }
    .info-price .n-price{
        font-size: 24px;
        font-weight: bolder;
        color: rgb(201, 93, 93);
    }
    .info-price .o-price{
        font-size: 15px;
        margin-left: 5px;
        text-decoration: line-through;
    }
    .discount{
        font-size: 14px;
        background-color: rgb(253, 95, 122);
        border-radius: 10px;
        padding: 2px;
        color: white;
        margin-top: -5px;
        position: absolute;
        top: 5px;
    }
    .info-other{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
    }
    .info-service{
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .info-service-item img{
        padding-top: 3px;
        width: 15px;
        margin-right: 2px;
    }
    .info-service-item span{
        color: #000;
        font-weight: bold;
    }
</style>