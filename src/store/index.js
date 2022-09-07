import Vue from "vue";
import Vuex, { Store } from "vuex"
// 使用插件一次
Vue.use(Vuex)
// 引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from "./shopcart";
import user from "./user";
import trade from './trade'
// 对外暴露一个store对象实例
export default new Store({
    // 实现vuex仓库模块式开发存储数据
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})