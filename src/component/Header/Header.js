import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import './Header.css';
import 'antd/lib/menu/style/css';
import logo from './../../img/img_logo.png';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {changeItem} from './../../action/reducer.js';

const stateToProps = state => ({
    activeItem: state.activeItem
});
const stateToDispatch = dispatch => {
    return {
        doChangeItem: (item) => {
            dispatch(changeItem(item));
        }
    }
};

class Header extends Component {
    componentWillMount() {
        const path = window.location.pathname;
        if (path.startsWith("/home/news")) this.props.doChangeItem("news");
        else if (path.startsWith("/home/dishes")) this.props.doChangeItem("dishes");
        else if (path.startsWith("/home/contact")) this.props.doChangeItem("contact");
    }
    render() {
        return (<div id="header">
            <Menu
                mode="horizontal"
                selectedKeys={[this.props.activeItem]}
                onClick={(item) => this.props.doChangeItem(item.key)}
            >
                <Menu.Item key="home" className="left-items">
                    <Link to="/home">
                        <Icon type="home" />首页
                    </Link>
                </Menu.Item>
                <Menu.Item key="news" className="left-items">
                    <Link to="/home/news">
                        <Icon type="read" />新闻中心
                    </Link>
                </Menu.Item>
                <Menu.Item disabled>
                    <img src={logo} alt="" />
                </Menu.Item>
                <Menu.Item key="dishes" className="right-items">
                    <Link to="/home/dishes">
                        <Icon type="coffee" />菜品展示
                    </Link>
                </Menu.Item>
                <Menu.Item key="contact" className="right-items">
                    <Link to="/home/contact">
                        <Icon type="contacts" />联系我们
                    </Link>
                </Menu.Item>
            </Menu>
        </div>);
    }
}

export default connect(stateToProps, stateToDispatch)(Header);
