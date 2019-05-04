import React, {Component} from 'react';
import {Layout, Icon, Menu} from 'antd';
import 'antd/lib/layout/style/css';
import 'antd/lib/menu/style/css';
import {connect} from 'react-redux';
import {changeItem} from './../../../action/adminReducer.js';

const {Sider} = Layout;
const SubMenu = Menu.SubMenu;
const stateToProps = state => ({activeMenuItem: state.activeMenuItem});
const stateToDispatch = dispatch => {
    return {
        doChangeItem: (item) => {
            dispatch(changeItem(item));
        }
    }
};

class adminSider extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false
        };
    }
    onCollapse = (collapsed) => {
        this.setState({collapsed});
    }
    render() {
        return (<Sider collapsible="collapsible" collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <Menu mode="inline" theme="dark" onClick={(item) => this.props.doChangeItem(item.key)} selectedKeys={this.props.activeMenuItem}>
                <Menu.Item key="home">
                    <Icon type="home"/>首页
                </Menu.Item>
                <SubMenu key="dishes" title={<span> < Icon type = "coffee" /> 菜品管理</span>}>
                    <Menu.Item key="add_dishes">添加菜品</Menu.Item>
                    <Menu.Item key="delete_dishes">删改菜品</Menu.Item>
                </SubMenu>
                <SubMenu key="shops" title={<span> < Icon type = "shop" /> 店面管理</span>}>
                    <Menu.Item key="add_shop">添加店面</Menu.Item>
                    <Menu.Item key="delete_shop">删改店面</Menu.Item>
                </SubMenu>
                <SubMenu key="news" title={<span> < Icon type = "read" /> 新闻管理</span>}>
                    <Menu.Item key="add_news">添加新闻</Menu.Item>
                    <Menu.Item key="delete_news">删改新闻</Menu.Item>
                </SubMenu>
                <SubMenu key="recruits" title={<span> < Icon type = "team" /> 招聘管理</span>}>
                    <Menu.Item kye="add_recruit">添加招聘</Menu.Item>
                    <Menu.Item key="delete_recruit">删改招聘</Menu.Item>
                </SubMenu>
                <Menu.Item key="messages">
                    <Icon type="message"/>留言管理
                </Menu.Item>
            </Menu>
        </Sider>);
    }
}

export default connect(stateToProps, stateToDispatch)(adminSider);
