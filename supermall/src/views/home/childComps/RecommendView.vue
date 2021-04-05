<template>
    <div class="recommends">
        <div v-for="(item, index) in recommends" :key="item.acm" class="recommends-item">
            <a :href="item.link">
                <img :src="item.image">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'RecommendView',
        props: {
            recommends: {
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>
<style scoped>
    .recommends {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        text-align: center;
        padding: 10px 0 15px;

        border-bottom: 8px solid #eee;
    }

    .recommends-item {
        flex: 1;
    }

    .recommends-item img {
        width: 80%;
    }
</style>