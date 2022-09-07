import { reqGoodsInfo, reqUpdateShopCart } from "@/api"
// 生成一个随机字符串------不能再变
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo: {},
    // 临时游客身份
    uuid_token:getUUID()
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    },
}
const actions = {
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqUpdateShopCart(skuId, skuNum)
        // 加入购物车之后（发请求），前台将参数带给服务器
        // 服务器写入成功，并没有返回数据，只是返回code==200。代表操作成功
        // asyn 当前这个函数执行返回promise
        if (result.code == 200) {
            return 'Ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
// 简化数据而生
const getters = {
    // state.goodInfo初始是一个空对象，没有categoryView
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}