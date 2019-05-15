import React, {Component} from 'react';
import {Layout, Icon, Menu} from 'antd';
import 'antd/lib/layout/style/css';
import 'antd/lib/menu/style/css';
import {connect} from 'react-redux';
import {changeItem} from './../../../action/adminReducer.js';
import {Link} from 'react-router-dom';

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
            <Menu mode="inline" theme="dark" selectedKeys={this.props.activeMenuItem}>
                <Menu.Item key="home">
                    <Link to="/admin" onClick={() => this.props.doChangeItem(["home"])}>
                        <Icon type="home"/>首页
                    </Link>
                </Menu.Item>
                <SubMenu key="dishes" title={<span> < Icon type = "coffee" /> 菜品管理</span>}>
                    <Menu.Item key="add_dishes" >
                        <Link to="/admin/add_dish" onClick={() => this.props.doChangeItem(["dishes", "add_dishes"])}>
                            添加菜品
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="manage_dishes">
                        <Link to="/admin/dish" onClick={() => this.props.doChangeItem(["dishes", "manage_dishes"])}>
                            管理菜品
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="shops" title={<span> < Icon type = "shop" /> 店面管理</span>}>
                    <Menu.Item key="add_shop">
                        <Link to="/admin/add_shop" onClick={() => this.props.doChangeItem(["shops", "add_shop"])}>
                            添加店面
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="manage_shop">
                        <Link to="/admin/shop" onClick={() => this.props.doChangeItem(["shops", "manage_shop"])}>
                            管理店面
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="news" title={<span> < Icon type = "read" /> 新闻管理</span>}>
                    <Menu.Item key="add_news">
                        <Link to="/admin/add_news" onClick={() => this.props.doChangeItem(["news", "add_news"])}>
                            添加新闻
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="manage_news">
                        <Link to="/admin/news" onClick={() => this.props.doChangeItem(["news", "manage_news"])}>
                            管理新闻
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="recruits" title={<span> < Icon type = "team" /> 招聘管理</span>}>
                    <Menu.Item key="add_recruit">
                        <Link to="/admin/add_recruit" onClick={() => this.props.doChangeItem(["recruits", "add_recruit"])}>
                            添加招聘
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="manage_recruit">
                        <Link to="/admin/recruit" onClick={() => this.props.doChangeItem(["recruits", "manage_recruit"])}>
                            管理招聘
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="messages">
                    <Link to="/admin/messages" onClick={() => this.props.doChangeItem(["messages"])}>
                        <Icon type="message"/>留言管理
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>);
    }
}

export default connect(stateToProps, stateToDispatch)(adminSider);
