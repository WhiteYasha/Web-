import React, {Component} from 'react';
import {Icon} from 'antd';
import {Link} from 'react-router-dom';
import './Footer.css';

class Footer extends Component {
    render() {
        return (<div className="footer">
            <div className="footer-info">
                <h1 className="footer-info-logo">新白鹿</h1>
                <div className="footer-info-menu">
                    <div className="footer-info-item">
                        <Link to="/contact">联系我们</Link>
                    </div>
                    <div className="footer-info-item">
                        <Link to="/contact/message">在线留言</Link>
                    </div>
                    <div className="footer-info-item">人才招聘</div>
                    <div className="footer-info-item">隐私条款</div>
                </div>
            </div>
            <div className="footer-copyright">
                <span className="footer-copyright-followus">
                    FOLLOW US:
                    <Icon type="qq" style={{
                            marginLeft: '1em',
                            padding: '0 0.2em'
                        }}/>
                    <Icon type="weibo" style={{
                            padding: '0 0.2em'
                        }}/>
                    <Icon type="facebook" style={{
                            padding: '0 0.2em'
                        }}/>
                </span>
                <section style={{
                        textAlign: 'right'
                    }}>
                    版权所有 杭州新白鹿餐饮管理有限公司 浙ICP备12045845号 POWERED BY Juchuang.net
                </section>
            </div>
        </div>);
    }
}

export default Footer;
