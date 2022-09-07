import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLoginOut } from '@/api'
import {setToken,getToken,removeToken} from '@/utils/token'
import { Promise } from 'core-js'
const state = {
    code: '',
    token:getToken(),
    userInfo:{}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    CLEAR(state){
        state.token=''
        state.userInfo={}
        removeToken()
    }
}
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async userRegister({commit},user){
       let result=await reqUserRegister(user)
       if(result.code==200){
           return 'ok'
       }else{
           return Promise.reject(new Error('faile'))
       }
    },
    // 登录
    async userLogin({commit},data){
        let result=await reqUserLogin(data)
        // 服务器下发token用户唯一标识
        // 将来经常通过带 token 找服务器要用户信息进行展示
        if(result.code==200){
            commit('USERLOGIN',result.data.token)
            // 持久化存储token
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
      let result=await reqUserInfo()
      if(result.code==200){
          commit('GETUSERINFO',result.data)
          return 'ok'
      }else{
          return Promise.reject(new Error('faile'))
      }
    },
    // 退出登录
    async userLogout({commit}){
        //只是向服务器发起请求，通知服务器清除token
        let result=await reqLoginOut()
        console.log(result)
        if(result.code==200){
            // actions里面不能操作state
            commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}