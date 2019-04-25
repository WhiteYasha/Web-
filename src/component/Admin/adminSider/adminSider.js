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
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} theme="light">
                <Menu mode="inline">
                    <Menu.Item>首页</Menu.Item>
                    <Menu.Item>菜品管理</Menu.Item>
                    <Menu.Item>店面管理</Menu.Item>
                    <Menu.Item>新闻管理</Menu.Item>
                    <Menu.Item>招聘管理</Menu.Item>
                    <Menu.Item>留言管理</Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default adminSider;
