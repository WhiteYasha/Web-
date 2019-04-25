import React, {Component} from 'react';
import Login from './component/Admin/Login/Login';
import Home from './page/Admin/Home/Home';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

const stateToProps = state => ({
    loginState: state.loginState
});

class AdminApp extends Component {
    render() {
        return (
            <div>
                <Route exact path="/admin" component={this.props.loginState ? Home : Login} />
            </div>
        );
    }
}

export default connect(stateToProps)(AdminApp);
