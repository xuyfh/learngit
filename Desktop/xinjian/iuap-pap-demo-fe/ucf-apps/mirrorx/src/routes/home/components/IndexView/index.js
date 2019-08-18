/**
 * App模块
 */

import React, { Component } from 'react';
import { Table, Button, ButtonGroup } from 'tinper-bee';
import {actions} from 'mirrorx';

import './index.less';

class IndexView extends Component {
    constructor(props) {
        super(props);
    }

    increment = () => {
        let {count} = this.props;
        let _state = {
            count: count +1
        }
        actions.home.updateState(_state);
    }

    decrement = () => {
        let {count} = this.props;
        let _state = {
            count: count -1
        }
        actions.home.updateState(_state);
    }

    incrementAsync = () => {
        let {count} = this.props;
        let _state = {
            count: count +1
        }
        actions.home.incrementAsync(_state);
    }

    goToContact = () => {
        const a = 1, b = 2;
        actions.routing.push({
            pathname: '/contact',
            search: `?a=${a}&b=${b}`
        })
    }
    
    render() {
        return (
            <div className="app-wrap">
                <h1>{this.props.count}</h1>
                <ButtonGroup style={{ margin: 10 }}>
                    <Button shape='border' onClick={this.increment}>+1</Button>
                    <Button shape='border' onClick={this.decrement}>-1</Button>
                    <Button shape='border' onClick={this.incrementAsync}>Async +1</Button>
                    <Button shape='border' onClick={this.goToContact}>go to contact</Button>
                </ButtonGroup>
            </div>
        );
    }
}

IndexView.displayName = "IndexView";
export default IndexView;
