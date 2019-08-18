/**
 * 服务请求类
 */
import request from "utils/request";
import {deepClone} from 'utils';

//定义接口地址
const URL = {
    "SAVE_ORDER": `${GROBAL_HTTP_CTX}/popup_allowances/insertSelective`, //添加
    "UPDATE_ORDER": `${GROBAL_HTTP_CTX}/popup_allowances/updateSelective`, //修改
    "DEL_ORDER": `${GROBAL_HTTP_CTX}/popup_allowances/deleteBatch`,
    "GET_LIST": `${GROBAL_HTTP_CTX}/popup_allowances/list`, //获取列表
}

/**
 * 获取主列表
 * @param {*} params
 */
export const getList = (param) => {
    let newParam = Object.assign({}, param),
        pageParams = deepClone(newParam.pageParams);
    delete newParam.pageParams;
    return request(URL.GET_LIST, {
        method: "post",
        data: newParam,
        param: pageParams,
        // data: {whereParams:param.whereParams},
        // param: param.pageParams,
    });
}

//新增
export const saveList = (param) => {
    return request(URL.SAVE_ORDER, {
        method: "post",
        data: param,
    });
}

//删除
export const deleteList = (param) => {
    return request(URL.DEL_ORDER, {
        method: "post",
        data: param,
    });
}