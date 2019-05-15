import React, {Component} from 'react';
import {Layout} from 'antd';
import 'antd/lib/layout/style/css';
import Login from './component/Admin/Login/Login';
import Home from './page/Admin/Home/Home';
import AddNews from './page/Admin/AddNews/AddNews';
import Messages from './page/Admin/Messages/Messages';
import ManageNews from './page/Admin/ManageNews/ManageNews';
import AddDishes from './page/Admin/AddDishes/AddDishes';
import {Route} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {initList} from './action/adminReducer.js';
import adminHeader from './component/Admin/adminHeader/adminHeader';
import adminSider from './component/Admin/adminSider/adminSider';

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
            axios.get("http://localhost:9000/getShopList"),
            axios.get("http://localhost:9000/getDishesList"),
            axios.get("http://localhost:9000/getRecruitList"),
            axios.get("http://localhost:9000/getNewsList"),
            axios.get("http://localhost:9000/getMessageList"),
            axios.get("http://localhost:9000/getVisits")
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
                            <Route exact path="/admin/news" component={ManageNews} />
                            <Route exact path="/admin/add_news" component={AddNews} />
                            <Route exact path="/admin/messages" component={Messages} />
                            <Route exact path="/admin/add_dish" component={AddDishes} />
                        </Layout>
                    </Layout>) : <Route path="/admin" component={Login} />
                }
            </div>
        );
    }
}

export default connect(stateToProps, stateToDispatch)(AdminApp);
