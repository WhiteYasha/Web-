import React, {Component} from 'react';
import {Layout, Icon, Menu} from 'antd';
import 'antd/lib/layout/style/css';
import 'antd/lib/menu/style/css';

const {Sider} = Layout;

class adminSider extends Component {
    constructor() {
        super();
        this.state = {collapsed: false};
    }
    onCollapse = (collapsed) => {
        this.setState({collapsed});
    }
    render() {
        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <Menu mode="inline" theme="dark">
                    <Menu.Item>
                        <Icon type="home" />首页
                    </Menu.Item>
                    <Menu.Item>
                        <Icon type="coffee" />菜品管理
                    </Menu.Item>
                    <Menu.Item>
                        <Icon type="shop" />店面管理
                    </Menu.Item>
                    <Menu.Item>
                        <Icon type="read" />新闻管理
                    </Menu.Item>
                    <Menu.Item>
                        <Icon type="team" />招聘管理
                    </Menu.Item>
                    <Menu.Item>
                        <Icon type="message" />留言管理
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default adminSider;
