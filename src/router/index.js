// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)
import routes from './routes'
// 引入store
import store from '@/store'
// 先把VueRouter原型上的push保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push|replace
// 第一个参数：告诉原来的push方法，你往哪里跳转（传递哪些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // call || apply的区别
        // 相同点，都可以调用一次函数，都可以篡改函数的上下文一次
        // 不同点:call与apply传递参数，call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 配置路由
let router = new VueRouter({
    // 配置路由
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    }
})

// 全局前置守卫：（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
    // next:放行函数  next()    next(path) 放行到指定路由 next(false)
    // next()
    // 用户登录才会有token
    let token = store.state.user.token
    // 用户名
    let name = store.state.user.userInfo.name
    if (token) {
        if (to.path == '/login') {
            next('/home')
        } else {
            // 登录成功，去的不是登录路由
            if (name) {
                next()
            }
            else {
                // 如果没有用户信息
                // 获取用户信息
                try {
                    // 获取用户信息成功放行
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效了 退出登录--从新登录
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录，不能去交易相关trade 支付相关 pay paysuccess 个人中心--跳转到登录页
        let  topath=to.path
        if(topath.indexOf('/trade')!=-1 || topath.indexOf('/pay')!=-1 || topath.indexOf('/center')!=-1){
            // 把未登录想要去的信息存储于地址栏中
            next('/login?redirect='+topath)
        }else{
            // 如果不是放行
            next()
        }
    }
})

export default router