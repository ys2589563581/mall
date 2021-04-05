<template>
        <div v-if="Object.keys(commentInfo).length!==0" class="comment-info">
            <div class="info-header">
                <div class="header-title">用户评价</div>
                <div class="header-more">
                    更多
                    <i class="arrow-right"></i>
                </div>
            </div>
            <div class="info-user">
                <img :src="commentInfo.user.avatar" alt="">
                <span>{{commentInfo.user.uname}}</span>
            </div>
            <div class="info-detail">
                <p>{{commentInfo.content}}</p>
                <div class="info-other">
                    <span class="date">{{commentInfo.created | showDate}}</span>
                    <span>{{commentInfo.style}}</span>
                </div>
                <div class="info-imgs">
                    <img  v-for="(item, index) in commentInfo.images" :key="index" :src="item">
                </div>
            </div>
        </div>
</template>
<script>
    //导入时间戳转换工具
    import moment from 'moment';
    //设置为中国
    moment.locale('zh-cn');   
export default {
    name:'DetailCommentInfo',
    props: {
        commentInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    //过滤器
    filters:{
        showDate(value){
            //1.将时间戳(单位秒)转换为Date对象(毫秒)
            const date=new Date(value * 1000)

            //2.将data进行格式化
            return moment(date).format('YYYY-MM-DD')

        }
    }
}
</script>
<style scoped>
    .comment-info{
        padding: 5px 12px;
        color: #333;
        border-bottom: 5px solid #f2f5f8;
    }
    .info-header{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid rgba(0, 0, 0, .2);
    }
    .header-title{
        float: left;
        font-size: 15px;
    }
    .header-more{
        float: right;
        margin-right: 10px;
        font-size: 15px;
    }
    .info-user{
        padding: 10px 0 5px;
    }
    .info-user img{
        width: 42px;
        height: 42px;
        border-radius: 50%;
    }
    .info-user span{
        position: relative;
        font-size: 15px;
        top: -15px;
        margin-left: 10px;
    }
    .info-detail{
        padding: 0 5px 15px;
    }
    .info-detail .info-other{
        font-size: 12px;
        color: #999;
        margin-top:10px ;
    }
    .info-other .date{
        margin-right: 8px;
    }
    .info-imgs{
        margin-top: 10px;
    }
    .info-imgs img{
        width: 70px;
        height: 70px;
        margin-right: 5px;
    }
</style>