import React, {Component} from 'react';
import {
    Layout,
    Card,
    Row,
    Col,
    Statistic,
    Icon,
    Badge
} from 'antd';
import 'antd/lib/badge/style/css';
import 'antd/lib/layout/style/css';
import 'antd/lib/statistic/style/css';
import 'antd/lib/card/style/css';
import 'antd/lib/row/style/css';
import adminHeader from './../../../component/Admin/adminHeader/adminHeader';
import adminSider from './../../../component/Admin/adminSider/adminSider';
import VisitChart from './../../../component/Admin/visitChart/visitChart';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

const {Content} = Layout;
const stateToProps = state => ({visitList: state.visitList, messageList: state.messageList});

class Home extends Component {
    countMessage = () => {
        var sum = 0;
        this.props.messageList.forEach((item) => {
            if (item.watched === 0)
                sum += 1;
            }
        );
        return sum;
    }
    render() {
        let todayVisit = this.props.visitList[this.props.visitList.length - 1].number,
            yesterdayVisit = this.props.visitList[this.props.visitList.length - 2].number;
        let rate = parseFloat(todayVisit - yesterdayVisit) / yesterdayVisit * 100;
        let message = this.countMessage();
        return (<Layout style={{
                minHeight: '100vh'
            }}>
            <Route path="/admin" component={adminSider}/>
            <Layout>
                <Route path="/admin" component={adminHeader}/>
                <Content style={{
                        padding: '16px 0'
                    }}>
                    <Row>
                        <Col span={22} offset={1}>
                            <Card title="最近一个月访问量统计">
                                <VisitChart/>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={{
                            marginTop: '16px'
                        }} gutter={16}>
                        <Col span={3} offset={1}>
                            <Card>
                                <Statistic title="今日访问量" value={todayVisit}/>
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card>
                                <Statistic title="访问量相对昨日变化" value={Math.abs(rate)} precision={2} valueStyle={{
                                        color: rate < 0
                                            ? '#3f8600'
                                            : '#cf1322'
                                    }} prefix={rate < 0
                                        ? <Icon type="arrow-down"/>
                                        : <Icon type="arrow-up"/>} suffix="%"/>
                            </Card>
                        </Col>
                        <Col span={4} style={{height: '100%'}}>
                            <Card>
                                <Statistic title="未查看留言" value={message} valueStyle={{
                                        color: message > 0
                                            ? '#cf1322'
                                            : 'black'
                                    }}/>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card title="编辑中的内容">
                                {
                                    JSON.parse(localStorage.getItem("shopContent")) === null
                                        ? <p>无编辑中的店铺信息</p>
                                        : <Badge dot><p>继续编辑店铺信息</p></Badge>
                                }
                                {
                                    JSON.parse(localStorage.getItem("dishContent")) === null
                                        ? <p>无编辑中的菜品信息</p>
                                        : <Badge dot><p>继续编辑菜品信息</p></Badge>
                                }
                                {
                                    JSON.parse(localStorage.getItem("newsContent")) === null
                                        ? <p>无编辑中的新闻</p>
                                        : <Badge dot><p>继续编辑新闻</p></Badge>
                                }
                                {
                                    JSON.parse(localStorage.getItem("recruitContent")) === null
                                        ? <p>无编辑中的招聘信息</p>
                                        : <Badge dot><p>继续编辑招聘信息</p></Badge>
                                }
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>);
    }
}

export default connect(stateToProps)(Home);
