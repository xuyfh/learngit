import React, { Component } from 'react';
import { actions } from 'mirrorx';
import { Button } from 'tinper-bee';
import './index.less';

class IndexView extends Component {

    goHome = () => {
        actions.routing.push({
            pathname: '/'
        })
    }
    render() {
        return (
            <div className="contact-wrap">
                Hello,World Contact
                <Button shape='border' onClick={this.goHome}>go home</Button>
            </div>
        );
    }
}

export default IndexView;
