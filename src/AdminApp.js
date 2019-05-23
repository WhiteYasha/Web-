import React, {Component} from 'react';
import Loginpage from './page/Loginpage/Loginpage';
import Admin from './page/Admin/Admin';
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
                    <Admin /> : <Route path="/admin" component={Loginpage} />
                }
            </div>
        );
    }
}

export default connect(stateToProps, stateToDispatch)(AdminApp);
