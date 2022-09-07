// 当前这个模块，对API进行统一管理
import requests from './request'
import mockRequests from './mockAjax'
//三级联动接口
// /api/product/getBaseCategoryList   get   无参数
// axios发请求返回结果是个Promise对象
export const reqCategoryList=()=>requests({
        url:'/product/getBaseCategoryList',
        method:'get'
    })

// 获取banner(Home轮播图接口)
export const reqGetBannerList=()=>mockRequests.get('/banner')

// 获取floor数据
export const reqFloorList=()=>mockRequests.get('/floor')

// 获取搜索模块数据   地址：/api/list 请求方式：post 参数：需要带参数
/*
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
 */

// 当前这个接口（获取搜索模块数据），给服务器需要传递一个参数，至少是一个空对象
export const reqGetSearchInfo=(params)=>requests({
  url:'/list',
  method:'post',
  data:params
})
// 获取产品详情信息的接口
export const reqGoodsInfo=(skuId)=>requests({url:`/item/${skuId}`,method:'get'})

// 将产品添加到购物车 /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

// 获取购物车列表数据
export const reqCartList=()=>requests({url:'/cart/cartList',method:'get'})

// 删除购物产品的接口
export const reqDeleteCartById=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

// 修改产品的选中状态
export const reqUpadateCheckById=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 获取验证码
export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

// 用户注册接口
export const reqUserRegister=(data)=>requests({url:'/user/passport/register',data,method:'post'})

// 登录
export const reqUserLogin=(data)=>requests({url:'/user/passport/login',data,method:'post'})

// 登陆成功获取用户信息
export const reqUserInfo=()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})

// 退出登录
export const reqLoginOut=()=>requests({url:'/user/passport/logout',method:'get'})

// 获取用户地址信息
export const reqAddressInfo=()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

// 获取订单交易页信息
export const reqOrderInfo=()=>requests({url:'/order/auth/trade',method:'get'})

// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

// 获取订单支付信息
export const reqPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,methods:'get'})

// 微信订单支付状态
export const reqPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取个人中心数据
export const reqMyOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})