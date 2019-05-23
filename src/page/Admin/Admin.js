import React, {Component} from 'react';
import Home from './Home/Home';
import AddNews from './AddNews/AddNews';
import AddShop from './AddShop/AddShop';
import AddRecruit from './AddRecruit/AddRecruit';
import Messages from './Messages/Messages';
import ManageNews from './ManageNews/ManageNews';
import ManageDishes from './ManageDishes/ManageDishes';
import ManageShop from './ManageShop/ManageShop';
import AddDishes from './AddDishes/AddDishes';
import ManageRecruit from './ManageRecruit/ManageRecruit';
import adminHeader from './../../component/Admin/adminHeader/adminHeader';
import adminSider from './../../component/Admin/adminSider/adminSider';
import {Layout} from 'antd';
import {Route} from 'react-router-dom';

const {Content} = Layout;

class Admin extends Component {
    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Route path="/admin" component={adminSider}/>
                <Layout>
                    <Route path="/admin" component={adminHeader}/>
                    <Content style={{padding: '16px calc(100% / 24)'}}>
                    <div style={{background: '#fff', border: '1px solid #ccc', height: 'auto', padding: '5%'}}>
                        <Route exact path="/admin" component={Home}/>
                        <Route exact path="/admin/add_dish" component={AddDishes}/>
                        <Route exact path="/admin/dish" component={ManageDishes}/>
                        <Route exact path="/admin/add_shop" component={AddShop}/>
                        <Route exact path="/admin/shop" component={ManageShop}/>
                        <Route exact path="/admin/add_news" component={AddNews}/>
                        <Route exact path="/admin/news" component={ManageNews}/>
                        <Route exact path="/admin/add_recruit" component={AddRecruit}/>
                        <Route exact path="/admin/recruit" component={ManageRecruit}/>
                        <Route exact path="/admin/messages" component={Messages}/>
                    </div>
                </Content>
            </Layout>
        </Layout>
        );
    }
}

export default Admin;
