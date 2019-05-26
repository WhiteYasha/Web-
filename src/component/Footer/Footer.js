import React, {Component} from 'react';
import {Icon} from 'antd';
import {connect} from 'react-redux';
import {changeItem} from './../../action/reducer.js';
import {Link} from 'react-router-dom';
import './Footer.css';

const stateToProps = state => ({activeItem: state.activeItem});
const stateToDispatch = dispatch => {
    return {
        doChangeItem: () => {
            dispatch(changeItem("contact"));
        }
    }
};

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="footer-info">
                    <h1 className="footer-info-logo">新白鹿</h1>
                    <div className="footer-info-menu">
                        <div className="footer-info-item">
                            <Link to="/home/contact" onClick={this.props.doChangeItem}>联系我们</Link>
                        </div>
                        <div className="footer-info-item">
                            <Link to="/home/contact/message" onClick={this.props.doChangeItem}>在线留言</Link>
                        </div>
                        <div className="footer-info-item">
                            <Link to="/home/contact/recruit" onClick={this.props.doChangeItem}>人才招聘</Link>
                        </div>
                        <div className="footer-info-item">隐私条款</div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <span className="footer-copyright-followus">
                        FOLLOW US:
                        <Link to="http://t.qq.com/xinbailucanyin" className="follow">
                            <Icon type="qq" style={{marginLeft: '1em', padding: '0 0.2em'}}/>
                        </Link>
                        <Link to="https://weibo.com/xinbailu" className="follow">
                            <Icon type="weibo" style={{padding: '0 0.2em'}}/>
                        </Link>
                    </span>
                    <section style={{textAlign: 'right'}}>
                        版权所有 杭州新白鹿餐饮管理有限公司 浙ICP备12045845号
                    </section>
                </div>
            </div>
        );
    }
}

export default connect(stateToProps, stateToDispatch)(Footer);
