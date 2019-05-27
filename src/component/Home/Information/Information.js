import React, {Component} from 'react';
import {Row, Col, Icon} from 'antd';
import 'antd/lib/row/style/css';
import './Information.css';
import {Link} from 'react-router-dom';
import {changeItem} from './../../../action/reducer.js';
import {connect} from 'react-redux';

const stateToProps = state => ({});
const stateToDispatch = dispatch => {
    return {
        doChangeItem: (item) => {
            dispatch(changeItem(item));
        }
    }
};

class Information extends Component {
    handleClick = (e) => {
        this.props.doChangeItem("contact");
    }
    render() {
        return (<div>
            <div className="home-cover" />
            <Row className="home-contact">
                <Col className="home-contact-left" span={4} offset={4}>
                    <h2>新白鹿</h2>
                    <p>
                        做最好的服务，最好的出品，最好的环境
                    </p>
                </Col>
                <Col className="home-contact-right" span={12}>
                    <div style={{textAlign: 'center', paddingTop: '0.5em'}}>
                        <Link to="https://weibo.com/xinbailu?is_all=1">
                            <Icon type="weibo" style={{color: '#fff', padding: '0 0.5em', fontSize: '18px'}} />
                        </Link>
                        <Link to="http://t.qq.com/xinbailucanyin">
                            <Icon type="qq" style={{color: '#fff', padding: '0 0.5em', fontSize: '18px'}} />
                        </Link>
                        <Icon type="twitter" style={{color: '#fff', padding: '0 0.5em', fontSize: '18px'}} />
                    </div>
                    <div style={{margin: 'calc(48px - 0.25em) 0'}}>
                        <div className="home-contact-right-btn">
                            <Link to="/home/contact" style={{color: '#e30202'}} onClick={this.handleClick}>CONTACT US</Link>
                        </div>
                        <Icon type="phone" style={{color: '#fff', fontSize: '48px', padding: '0 0.5em'}} />
                        <div style={{display: 'inline-block'}}>
                            <section style={{fontSize: '12px', color: '#fff', textAlign: 'right'}}>WELCOME TO OUR WEBSITE</section>
                            <section style={{fontSize: '30px', color: '#fff', fontWeight: 'bold'}}>+ 0571-88025588</section>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="home-aboutus">
                <h1 className="home-aboutus-title">关于我们</h1>
                <section className="home-aboutus-section">
                    1998年，新白鹿从杭州耶稣堂弄的一家小面馆起家，而后开启杭州人排队吃饭先河、并十余年创造排队奇迹的人气餐厅。
                    新白鹿一路走来，在润物细无声的过程中，经历着一次又一次的华丽蜕变与自我超越。
                </section>
                <Row style={{height: '200px'}}>
                    <Col span={4} offset={1} className="home-aboutus-mod">
                        <Icon type="customer-service" className="home-aboutus-mod-icon"/>
                        <p>顾客至上</p>
                    </Col>
                    <Col span={4} offset={2} className="home-aboutus-mod">
                        <Icon type="read" className="home-aboutus-mod-icon" />
                        <p>学习成长</p>
                    </Col>
                    <Col span={4} offset={2} className="home-aboutus-mod">
                        <Icon type="smile" className="home-aboutus-mod-icon" />
                        <p>激情快乐</p>
                    </Col>
                    <Col span={4} offset={2} className="home-aboutus-mod">
                        <Icon type="team" className="home-aboutus-mod-icon" />
                        <p>团队合作</p>
                    </Col>
                </Row>
            </Row>
        </div>);
    }
}

export default connect(stateToProps, stateToDispatch)(Information);
