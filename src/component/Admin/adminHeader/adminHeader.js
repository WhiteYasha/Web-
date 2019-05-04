import React, {Component} from 'react';
import {Layout} from 'antd';
import 'antd/lib/layout/style/css';

const {Header} = Layout;

class adminHeader extends Component {
    render() {
        return (<div>
            <Header style={{
                    background: '#fff',
                    padding: 0
                }}>
                header
            </Header>
        </div>);
    }
}

export default adminHeader;
