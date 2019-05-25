import React, {Component} from 'react';
import {Layout, Row, Col, Icon, Badge, Tooltip} from 'antd';
import 'antd/lib/layout/style/css';
import 'antd/lib/tooltip/style/css';
import 'antd/lib/badge/style/css';
import 'antd/lib/row/style/css';
import {changeLoginState} from './../../../action/adminReducer.js';
import {connect} from 'react-redux';

const {Header} = Layout;
const stateToProps = state => ({
    messageList: state.messageList.filter((item) => item.watched === 0)
});
const stateToDispatch = dispatch => {
    return {
        doChangeLoginState: () => {
            dispatch(changeLoginState(false));
        }
    }
};

class adminHeader extends Component {
    notificationNoMessage = (
        <Tooltip title="无新消息提醒">
            <Icon type="notification" style={{cursor: 'pointer'}} />
        </Tooltip>
    )
    notificationMessage = (
        <Badge dot>
            <Tooltip title={`有${this.props.messageList.length}条新留言`}>
                <Icon type="notification" style={{cursor: 'pointer'}} />
            </Tooltip>
        </Badge>
    )
    render() {
        return (<div>
            <Header style={{
                    background: '#fff'
                }}>
                <Row>
                    <Col span={1} offset={21}>
                        {this.props.messageList.length === 0 ? this.notificationNoMessage : this.notificationMessage}
                    </Col>
                    <Col span={1}>
                        <Tooltip title="退出登录">
                            <Icon type="poweroff" style={{cursor: 'pointer'}} onClick={this.props.doChangeLoginState}/>
                        </Tooltip>
                    </Col>
                </Row>
            </Header>
        </div>);
    }
}

export default connect(stateToProps, stateToDispatch)(adminHeader);
