import React, {Component} from 'react';
import {Layout} from 'antd';
import 'antd/lib/layout/style/css';
import Loginpage from './page/Loginpage/Loginpage';
import Home from './page/Admin/Home/Home';
import AddNews from './page/Admin/AddNews/AddNews';
import AddShop from './page/Admin/AddShop/AddShop';
import AddRecruit from './page/Admin/AddRecruit/AddRecruit';
import Messages from './page/Admin/Messages/Messages';
import ManageNews from './page/Admin/ManageNews/ManageNews';
import ManageDishes from './page/Admin/ManageDishes/ManageDishes';
import ManageShop from './page/Admin/ManageShop/ManageShop';
import AddDishes from './page/Admin/AddDishes/AddDishes';
import adminHeader from './component/Admin/adminHeader/adminHeader';
import adminSider from './component/Admin/adminSider/adminSider';
import {Route} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {initList} from './action/adminReducer.js';

const stateToProps = state => ({loginState: state.loginState});
const stateToDispatch = dispatch => {
    return {
        doInit: (lists) => {
            dispatch(initList(lists));
        }
    }
};

class AdminApp extends Component {
    componentWillMount() {
        document.title = "杭州新白鹿餐饮后台管理系统";
        axios.all([
            axios.get("http://localhost:9001/getShopList"),
            axios.get("http://localhost:9001/getDishesList"),
            axios.get("http://localhost:9001/getRecruitList"),
            axios.get("http://localhost:9001/getNewsList"),
            axios.get("http://localhost:9001/getMessageList"),
            axios.get("http://localhost:9001/getVisits")
        ]).then(axios.spread((shopResp, dishesResp, recruitResp, newsResp, messResp, visitResp) => {
            var lists = {
                shopList: shopResp.data,
                dishesList: dishesResp.data,
                recruitList: recruitResp.data,
                newsList: newsResp.data,
                messageList: messResp.data,
                visitList: visitResp.data
            };
            this.props.doInit(lists);
            this.setState({isLoading: false});
        }));
    }
    render() {
        return (
            <div>
                {
                    this.props.loginState ?
                    (<Layout style={{
                            minHeight: '100vh'
                        }}>
                        <Route path="/admin" component={adminSider}/>
                        <Layout>
                            <Route path="/admin" component={adminHeader} />
                            <Route exact path="/admin" component={Home} />
                            <Route exact path="/admin/add_dish" component={AddDishes} />
                            <Route exact path="/admin/dish" component={ManageDishes} />
                            <Route exact path="/admin/add_shop" component={AddShop} />
                            <Route exact path="/admin/shop" component={ManageShop} />
                            <Route exact path="/admin/add_news" component={AddNews} />
                            <Route exact path="/admin/news" component={ManageNews} />
                            <Route exact path="/admin/add_recruit" component={AddRecruit} />
                            <Route exact path="/admin/messages" component={Messages} />
                        </Layout>
                    </Layout>) : <Route path="/admin" component={Loginpage} />
                }
            </div>
        );
    }
}

export default connect(stateToProps, stateToDispatch)(AdminApp);
