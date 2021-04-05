import axios from 'axios'

//终极升级版
export function request(config) { 
    //1.创建axios实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5/',
        timeout: 5000
    })


    //axios拦截器 
    //全局拦截
    // axios.interceptors

    instance.interceptors.request.use(config => {
        //发送请求成功
        // console.log(config);
        //拦截器放行，将config返回出去
        return config

        //什么时候需要拦截
        //1.比如config中的一些信息不符合服务器规范的要求

        //2.比如每次发送网络请求是，都希望在界面中显示请求图标

        //3.某些网络请求(比如登录),必须携带一些特殊的信息
    }, err => {
        //发送请求失败
        // console.log(err); 
    })


    // 2.响应拦截

    instance.interceptors.response.use(res => {
        //响应结果
        return res.data
    }, err => {
        //响应失败
    })


    //instance为axios实例，本身就是promise对象
    return instance(config)

}
