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
import VisitChart from './../../../component/Admin/visitChart/visitChart';
import {connect} from 'react-redux';

const {Content} = Layout;
const stateToProps = state => ({visitList: state.visitList, messageList: state.messageList, recruitList: state.recruitList});

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
    savedContent = () => {
        let shopContent = JSON.parse(localStorage.getItem("shopContent")),
            newsContent = JSON.parse(localStorage.getItem("newsContent")),
            dishContent = JSON.parse(localStorage.getItem("dishContent")),
            recruitContent = JSON.parse(localStorage.getItem("recruitContent"));
        return (<div>
            {
                shopContent === null
                    ? ""
                    : <Badge dot="dot">
                            <p>继续编辑店铺信息</p>
                        </Badge>
            }
            {
                newsContent === null
                    ? ""
                    : <Badge dot="dot">
                            <p>继续编辑店铺信息</p>
                        </Badge>
            }
            {
                dishContent === null
                    ? ""
                    : <Badge dot="dot">
                            <p>继续编辑店铺信息</p>
                        </Badge>
            }
            {
                recruitContent === null
                    ? ""
                    : <Badge dot="dot">
                            <p>继续编辑店铺信息</p>
                        </Badge>
            }
            {
                shopContent === null && newsContent === null && dishContent === null && recruitContent === null
                    ? <p>无编辑中的内容</p>
                    : ""
            }
        </div>);
    }
    render() {
        let todayVisit = this.props.visitList[this.props.visitList.length - 1].number,
            yesterdayVisit = this.props.visitList[this.props.visitList.length - 2].number;
        let rate = parseFloat(todayVisit - yesterdayVisit) / yesterdayVisit * 100;
        let message = this.countMessage();
        return (<Content style={{
                padding: '16px calc(100% / 24)'
            }}>
            <div style={{
                    background: '#fff',
                    border: '1px solid #ccc',
                    height: 'auto',
                    padding: '5%'
                }}>
                <Row>
                    <Col span={24}>
                        <Card title="最近一个月访问量统计">
                            <VisitChart/>
                        </Card>
                    </Col>
                </Row>
                <Row style={{
                        marginTop: '16px'
                    }} gutter={16}>
                    <Col span={4}>
                        <Card>
                            <Statistic title="今日访问量" value={todayVisit}/>
                        </Card>
                    </Col>
                    <Col span={5}>
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
                    <Col span={4}>
                        <Card>
                            <Statistic title="未查看留言" value={message} valueStyle={{
                                    color: message > 0
                                        ? '#cf1322'
                                        : 'black'
                                }}/>
                        </Card>
                    </Col>
                    <Col span={5}>
                        <Card>
                            <Statistic title="发布中的招聘信息" value={this.props.recruitList.length}/>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="编辑中的内容">
                            {this.savedContent()}
                        </Card>
                    </Col>
                </Row>
            </div>
        </Content>);
    }
}

export default connect(stateToProps)(Home);
