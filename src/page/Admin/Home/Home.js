import React, {Component} from 'react';
import {
    Card,
    Row,
    Col,
    Statistic,
    Icon,
    Badge,
    Tag
} from 'antd';
import 'antd/lib/badge/style/css';
import 'antd/lib/statistic/style/css';
import 'antd/lib/row/style/css';
import VisitChart from './../../../component/Admin/visitChart/visitChart';
import {connect} from 'react-redux';

const stateToProps = state => ({
    visitList: state.visitList,
    messageList: state.messageList,
    newsList: state.newsList,
    recruitList: state.recruitList
});

class Home extends Component {
    countMessage = () => {
        var sum = 0;
        this.props.messageList.forEach((item) => {
            if (item.watched === 0) sum += 1;
        });
        return sum;
    }
    savedContent = () => {
        let shopContent = JSON.parse(localStorage.getItem("shopContent")),
            newsContent = JSON.parse(localStorage.getItem("newsContent")),
            dishContent = JSON.parse(localStorage.getItem("dishContent")),
            recruitContent = JSON.parse(localStorage.getItem("recruitContent"));
        return (
            <div>
                {shopContent ? (<Badge dot><p>有编辑中的店铺信息</p></Badge>) : ""}
                {newsContent ? (<Badge dot><p>有编辑中的新闻</p></Badge>) : ""}
                {dishContent ? (<Badge dot><p>有编辑中的菜品</p></Badge>) : ""}
                {recruitContent ? (<Badge dot><p>有编辑中的招聘信息</p></Badge>) : ""}
                {shopContent === null && newsContent === null && dishContent === null && recruitContent === null
                    ? <p>无编辑中的内容</p>
                    : ""
                }
            </div>
        );
    }
    getMostViewNes = () => {
        let news = this.props.newsList;
        news.sort((a, b) => b.views - a.views);
        return [0, 1, 2].map((item, key) => {
            return (
                <div key={`div${key}`} style={{lineHeight: '2'}}>
                    {`${item + 1}. ${news[item].title}`}
                    <Tag key={`tag${key}`} style={{marginLeft: '8px'}}>{news[item].tag}</Tag>
                    <br />
                </div>
            );
        });
    }
    render() {
        let todayVisit = this.props.visitList[this.props.visitList.length - 1].number,
            yesterdayVisit = this.props.visitList[this.props.visitList.length - 2].number;
        let rate = parseFloat(todayVisit - yesterdayVisit) / yesterdayVisit * 100;
        let message = this.countMessage();
        return (
            <div>
                <Row gutter={16}>
                    <Col span={24}>
                        <Card title="最近一个月访问量统计">
                            <VisitChart/>
                        </Card>
                    </Col>
                </Row>
                <Row style={{marginTop: '16px'}} gutter={16}>
                    <Col span={6}>
                        <Card>
                            <Statistic title="今日访问量" value={todayVisit}/>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="访问量相对昨日变化"
                                value={Math.abs(rate)}
                                precision={2}
                                valueStyle={{color: rate < 0 ? '#3f8600' : '#cf1322'}}
                                prefix={rate < 0 ? <Icon type="arrow-down"/> : <Icon type="arrow-up"/>} suffix="%"/>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="未查看留言"
                                value={message}
                                valueStyle={{color: message > 0 ? '#cf1322' : 'black'}}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title="发布中的招聘信息" value={this.props.recruitList.length}/>
                        </Card>
                    </Col>
                </Row>
                <Row style={{marginTop: '16px'}} gutter={16}>
                    <Col span={8}>
                        <Card title="编辑中的内容">
                            {this.savedContent()}
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Card title="浏览最多的新闻">
                            {this.getMostViewNes()}
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(stateToProps)(Home);
