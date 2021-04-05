import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'

//导入fastclick 解决手机端300ms延迟问题
import FastClick from 'fastclick'

FastClick.attach(document.body)

//导入VueLazyLoad框架  懒加载
import VueLazyLoad from 'vue-lazyload'

//懒加载
Vue.use(VueLazyLoad,{
  //图片加载过程中显示的图片
  loading:require('./assets/img/common/placeholder.png')
})

Vue.config.productionTip = false

//安装自定义toast插件
Vue.use(toast)

Vue.prototype.$bus=new Vue()
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
