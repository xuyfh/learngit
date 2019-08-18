/**
 * 数据模型类
 */

import { actions } from "mirrorx";
import * as api from "./service";
import {processData} from 'utils';

export default {
    // 确定 Store 中的数据模型作用域
    name: "app",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        showLoading: false, //是否显示加载图标
        list: [] , //存放表格数据
        queryParam: { //请求参数
            pageParams: {
                pageIndex: 0,
                pageSize: 25
            },
            whereParams: []
        }
    },
    reducers: {
        /**
         * 纯函数，相当于 Redux 中的 Reducer，只负责对数据的更新。
         * @param {*} state
         * @param {*} data
         */
        updateState(state, data) { //更新state
            return {
                ...state,
                ...data
            };
        }
    },
    effects: {
        /**
         * 请求表体数据
         * @param {*} param
         * @param {*} getState
         */
        async loadList(param, getState) {
            // 正在加载数据，显示加载 Loading 图标
            actions.app.updateState({showLoading: true});
            // 调用 getList 请求数据
            let _param = param || getState().app.queryParam;
            let {result} = processData(await api.getList(_param));
            
            let {data:res}=result;
            let _state = {
                showLoading: false,
                queryParam: _param //更新搜索条件
            }
            // debugger
            if (res) {
                _state = Object.assign({}, _state, {
                    list: res.content 
                })
            }
            actions.app.updateState(_state);
        },

        async saveData(param){
            let status = null;
            let btnFlag = param.btnFlag;
            if(btnFlag === 0){
                let {result} = processData(await api.saveList(param),'保存成功');
                status = result.status;
            }

            if(status === 'success'){
                actions.app.loadList();
            }
        },
        //删除表格行数据
        async deleteData(param, getState){
            let {id} = param;
            let {result} = processData(await api.deleteList([{id}]),'删除成功');
            if(result.status === 'success'){
                actions.app.loadList();
            }
        }
    }
};
