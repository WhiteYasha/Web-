import React, {Component} from 'react';
import './App.css';
import Home from './page/Home/Home';
import News from './page/News/News';
import Dishes from './page/Dishes/Dishes';
import Contact from './page/Contact/Contact';
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import {Route, Switch} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
// eslint-disable-next-line {/*引入组件*/}
import {initList} from './action/reducer.js';
// eslint-disable-next-line {/*引入动作*/}

const stateToProps = state => ({

});
const stateToDispatch = dispatch => {
    return {
        doInitList: () => {
            axios.all([
                axios.get("http://localhost:9000/getShopList"),
                axios.get("http://localhost:9000/getDishesList"),
                axios.get("http://localhost:9000/getRecruitList"),
                axios.get("http://localhost:9000/getNewsList")
            ]).then(axios.spread((shopResp, dishesResp, recruitResp, newsResp) => {
                var lists = {
                    shopList: shopResp.data,
                    dishesList: dishesResp.data,
                    recruitList: recruitResp.data,
                    newsList: newsResp.data
                };
                dispatch(initList(lists));
            }));
        }
    }
};

class App extends Component {
    componentWillMount() {
        this.props.doInitList();
    }
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/news" component={News} />
                    <Route path="/dishes" component={Dishes} />
                    <Route path="/contact" component={Contact} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default connect(stateToProps, stateToDispatch)(App);
