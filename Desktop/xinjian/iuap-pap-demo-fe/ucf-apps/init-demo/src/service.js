/**
 * 服务请求类
 */
import request from "axios";
//定义接口地址
const URL = {
    "GET_LIST":  `/mock/1696/2019/getList`
}

/**
 * 获取主列表
 * @param {*} params
 */
export const getList = (params) => {
    return request(URL.GET_LIST, {
        method: "get",
        params
    });
}