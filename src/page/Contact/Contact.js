import React, {Component} from 'react';
import './Contact.css';
import {Button, Icon} from 'antd';
import 'antd/lib/button/style/css';
import Contactmap from './../../component/Contact/Contactmap/Contactmap';
import Contactmessage from './../../component/Contact/Contactmessage/Contactmessage';
import Contactrecruit from './../../component/Contact/Contactrecruit/Contactrecruit';
import {Route, Link} from 'react-router-dom';

class Contact extends Component {
    constructor() {
        super();
        this.state = {header: "联系我们"};
    }
    componentWillMount() {
        let pathname = window.location.pathname;
        if (pathname === "/home/contact/message") this.setState({header: "在线留言"});
        else if (pathname === "/home/contact/recruit") this.setState({header: "人才招聘"});
    }
    render() {
        return (
            <div style={{
                background: "rgb(240, 240, 239)",
                padding: '0 0 60px 0'
            }}>
            <div className="page-cover contact-page-cover">
                <header>联系我们</header>
                <section>做最好的服务，最好的出品，最好的环境。树餐饮服务标杆，用真诚感动每一位顾客。</section>
            </div>
            <div className="contact-router">
                <header>{this.state.header}</header>
                <div style={{
                        textAlign: 'center'
                    }}>
                    <Button>
                        <Link to="/home/contact"><Icon type="smile" style={{marginRight: '8px'}}/>联系我们</Link>
                    </Button>
                    <Button>
                        <Link to="/home/contact/message"><Icon type="message" style={{marginRight: '8px'}}/>在线留言</Link>
                    </Button>
                    <Button>
                        <Link to="/home/contact/recruit"><Icon type="team" style={{marginRight: '8px'}}/>人才招聘</Link>
                    </Button>
                    <Button>
                        <Icon type="link"/>友情链接
                    </Button>
                </div>
            </div>
            <Route exact path="/home/contact" component={Contactmap}/>
            <Route path="/home/contact/message" component={Contactmessage}/>
            <Route path="/home/contact/recruit" component={Contactrecruit} />
        </div>
        );
    }
}

export default Contact;
