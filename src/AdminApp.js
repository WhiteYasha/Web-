import React, {Component} from 'react';
import Login from './component/Admin/Login/Login';
import Home from './page/Admin/Home/Home';
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
        return (<div>
            <Route exact path="/admin" component={this.props.loginState
                    ? Home
                    : Login}/>
        </div>);
    }
}

export default connect(stateToProps, stateToDispatch)(AdminApp);
