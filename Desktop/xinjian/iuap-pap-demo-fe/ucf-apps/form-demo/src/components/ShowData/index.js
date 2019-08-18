/**
 * App模块
 */

import React, { Component } from 'react';

import './index.less';

class ShowData extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let { formData } = this.props;
        let data = [];
        Object.keys(formData).map((item,index) => {
            data.push(
                <p>第{index}项：{formData[item]}</p>
            )
        })
        return (
            <div className="show-data">
                {data}
            </div>
        );
    }
}

ShowData.displayName = "ShowData";
export default ShowData;
