export default {
    //context   上下文
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            //payload新添加的商品

            //1.查找之前数组是否有该商品  find返回符合条件的数组，没有则返回undefined
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            if (oldProduct) {//商品数量+1
                // oldProduct.count += 1
                context.commit('addCounter', oldProduct)
                resolve('商品数量+1')
            } else {//添加商品
                payload.count = 1
                // state.cartList.push(payload)
                context.commit('addToCart', payload)
                resolve('添加新的商品')
            }
        })
    }
}