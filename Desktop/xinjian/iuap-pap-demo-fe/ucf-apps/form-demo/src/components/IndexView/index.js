/**
 * App模块
 */

import React, { Component } from 'react';
import Edit from '../Edit';
import ShowData from '../ShowData';

import './index.less';

class IndexView extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { formData } = this.props;
        return (
            <div className="edit">
                <Edit />
                <ShowData formData={formData}/>
            </div>
        );
    }
}

export default IndexView;
