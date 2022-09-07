import { reqGetSearchInfo } from "@/api"
// search模块的小仓库
const state={
    searchList:{}
}
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
}
const actions={
    // 获取search模块数据，至少传递一个空对象参数
     async getSearchList({commit},params={}){
        //  params在用户派发actions的时候第二个参数传递的
        let result=await reqGetSearchInfo(params)
        if(result.code==200){
            commit('GETSEARCHLIST',result.data)
        }
    }
}
// 计算属性，在项目中为了简化数据而生
const getters={
    goodsList(state){
        // 没有网返回undefind 至少返回一个空数组才不报错
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    },
    attrsList(state){
        return state.searchList.attrsList||[]
    },
    
}

export default {
    state,
    mutations,
    actions,
    getters
}