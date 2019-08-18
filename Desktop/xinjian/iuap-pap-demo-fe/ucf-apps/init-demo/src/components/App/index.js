/**
 * App模块
 */

import React, { Component } from 'react';
import { Table, Button } from 'tinper-bee';
import Grid from 'bee-complex-grid';
import {actions} from 'mirrorx';

import './index.less';

class App extends Component {
    constructor(props) {
        super(props);
    }
    columns = [
        {
            title: '用户名',
            dataIndex: "username",
            key: "username",
            width: 300
        },
        {
            title: '性别',
            dataIndex: "sex",
            key: "sex",
            width: 500
        },
        {
            title: '年龄',
            dataIndex: "age",
            key: "age",
            width: 200
        }
    ];
    
    componentWillMount(){
        // actions.app.loadData();    
    }

    componentDidMount(){
        actions.app.loadData();    
    }

    render() {
        let {data} = this.props;
        let paginationObj = {
            items:10,//一页显示多少条
            total:100,//总共多少条、
            freshData:this.freshData,//点击下一页刷新的数据
            onDataNumSelect:this.onDataNumSelect, //每页大小改变触发的事件
            showJump:false,
            noBorder:true
        }
        return (
            <div className="app-wrap">
                <Grid
                    className="demo"
                    columns={this.columns}
                    data={data}
                    rowKey="id"
                    paginationObj={paginationObj}
                />
            </div>
        );
    }
}

App.displayName = "App";
export default App;
