import React, {Component} from 'react';
import Login from './../../component/Admin/Login/Login';

class Loginpage extends Component {
    render() {
        return (
            <div style={{height: '100vh', background: 'url("https://picsum.photos/1920/1080?random")', backgroundSize: '100% 100%'}}>
                <div style={{position: 'absolute', top: 'calc(50% - 200px)', left: 'calc(50% - 250px)'}}>
                    <Login />
                </div>
            </div>
        );
    }
}

export default Loginpage;
