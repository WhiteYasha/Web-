import React, {Component} from 'react';
import {Layout} from 'antd';
import 'antd/lib/layout/style/css';
import adminSider from './../../../component/Admin/adminSider/adminSider';
import {Route} from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Route path="/admin" component={adminSider} />
            </Layout>
        );
    }
}

export default Home;
