import React, {Component} from 'react';
import './Contact.css';
import {Button, Icon} from 'antd';
import 'antd/lib/button/style/css';
import Contactmap from './../../component/Contact/Contactmap/Contactmap';
import Contactmessage from './../../component/Contact/Contactmessage/Contactmessage';
import {Route} from 'react-router-dom';

class Contact extends Component {
    render() {
        return (<div style={{
                background: "rgb(240, 240, 239)",
                padding: '0 0 60px 0'
            }}>
            <div className="page-cover contact-page-cover">
                <header>联系我们</header>
                <section>做最好的服务，最好的出品，最好的环境。树餐饮服务标杆，用真诚感动每一位顾客。</section>
            </div>
            <div className="contact-router">
                <header>联系我们</header>
                <div style={{
                        textAlign: 'center'
                    }}>
                    <Button href="/contact">
                        <Icon type="smile"/>联系我们
                    </Button>
                    <Button href="/contact/message">
                        <Icon type="message"/>在线留言
                    </Button>
                    <Button>
                        <Icon type="team"/>人才招聘
                    </Button>
                    <Button>
                        <Icon type="link"/>友情链接
                    </Button>
                </div>
            </div>
            <Route exact="exact" path="/contact" component={Contactmap}/>
            <Route path="/contact/message" component={Contactmessage}/>
        </div>);
    }
}

export default Contact;
