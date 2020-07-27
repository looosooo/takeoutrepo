/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from "./ajax";
//const BASE_URL = "/api";
const BASE_URL = "http://139.159.144.143:8181";
const BAIDUMAP_URL =
  // "/reverse_geocoding/v3/?ak=HuNy0T3G0qAAADHlIhMnPLOcp4FFVnKn&output=json&coordtype=wgs84ll&location=";
  "http://api.map.baidu.com/reverse_geocoding/v3/?ak=HuNy0T3G0qAAADHlIhMnPLOcp4FFVnKn&output=json&coordtype=wgs84ll&location=";
// 1、根据经纬度获取位置详情
export const reqAddress = geohash => ajax(`${BAIDUMAP_URL}${geohash}`);
// 2、获取食品分类列表
export const reqFoodCategorys = () => ajax(BASE_URL + "/cate/index_category");
// 3、根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) =>
  ajax(BASE_URL + "/cate/shop_info");
// ajax(BASE_URL + "/shops", { longitude, latitude });
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (geohash, keyword) =>
  ajax(BASE_URL + "/search_shops", { geohash, keyword });
// 6、用户名密码登陆
export const reqPwdLogin = ({ name, pwd }) =>
  //ajax(BASE_URL + "/login_pwd", { name, pwd }, "POST");
  ajax(BASE_URL + "/user/login", { name, pwd }, "POST");
// 7、发送短信验证码
export const reqSendCode = phone => ajax(BASE_URL + "/sendcode", { phone });
// 8、手机号验证码登陆
export const reqSmsLogin = (phone, code) =>
  ajax(BASE_URL + "/login_sms", { phone, code }, "POST");
// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL + "/userinfo");
// 10、用户登出
export const reqLogout = () => ajax(BASE_URL + "/user/loginout");
// 11, 获取验证码
/*export const reqCaptcha = (name, data) =>
  ajax(BASE_URL + "/User/captcha", { name, data }, "POST");
*/
export const reqCaptcha = () => ajax(BASE_URL + "/User/captcha");

/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax("/info");

/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax("/ratings");

/**
 * 获取商家商品数组
 */
//export const reqShopGoods = () => ajax("/goods");
export const reqShopGoods = shopname =>
  ajax(BASE_URL + "/gshop/goods", { shopname });
