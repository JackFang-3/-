import Vue from 'vue'
import App from './App.vue'
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { Button, MessageBox} from 'element-ui'
// 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
// 全局注册
Vue.component(Button.name, Button)
// 挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 测试
// import {reqCategoryList} from '@/api'
// import {reqGetSearchInfo} from '@/api'
// reqCategoryList()
// 引入mock数据
import  '@/mock/mockServe'
// 引入swiper
import 'swiper/css/swiper.css'

// 统一接口api文件夹里面全部请求配置
// 统一引入
import * as API from '@/api'
import spiderman from '@/assets/1.gif'
// 引入插件
import VueLazyload from 'vue-lazyload'
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载图片
  loading:spiderman,
})

// 引入自定义插件
import myPlugins from '@/plugins/myPlugins'
// 引入表单验证
import '@/plugins/validate'

Vue.use(myPlugins,{
  name:'upper'
})


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 全局事件总线
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  },
  // 注册路由
  router,
  // 注册仓库：组件实例身上会多一个属性$store属性
  store
}).$mount('#app')
