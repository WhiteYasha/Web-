import React, {Component} from 'react';
import {Layout, Row, Col, Icon, Badge, Tooltip, Modal} from 'antd';
import 'antd/lib/row/style/css';
import {changeLoginState, changeItem} from './../../../action/adminReducer.js';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const {Header} = Layout;
const stateToProps = state => ({
    messageList: state.messageList.filter((item) => item.watched === 0)
});
const stateToDispatch = dispatch => {
    return {
        doChangeLoginState: () => {
            dispatch(changeLoginState(false));
        },
        doChangeItem: (item) => {
            dispatch(changeItem(item));
        }
    }
};

class adminHeader extends Component {
    notificationNoMessage = (
        <Tooltip title="无新消息提醒">
            <Icon type="notification" style={{cursor: 'pointer'}} />
        </Tooltip>
    )
    showLogoutModal = () => {
        Modal.confirm({
            title: "退出登录",
            content: "确定要退出登录吗?",
            okText: "确定",
            cancelText: "取消",
            onOk: () => {
                this.props.doChangeLoginState();
            }
        });
    }
    notificationMessage = (
        <Badge dot>
            <Tooltip
                title={
                    <Link to="/admin/messages" onClick={() => this.props.doChangeItem(["messages"])}>
                        {`有${this.props.messageList.length}条新留言`}
                    </Link>
                }
            >
                <Icon type="notification" style={{cursor: 'pointer'}} />
            </Tooltip>
        </Badge>
    )
    render() {
        return (<div>
            <Header style={{background: '#fff'}}>
                <Row gutter={16}>
                    <Col span={1} offset={20}>
                        <Link to="/admin" onClick={() => this.props.doChangeItem(["home"])}>
                            <Icon type="home" style={{cursor: 'pointer', color: 'rgba(0,0,0,0.65)'}}/>
                        </Link>
                    </Col>
                    <Col span={1}>
                        {this.props.messageList.length === 0 ? this.notificationNoMessage : this.notificationMessage}
                    </Col>
                    <Col span={1}>
                        <Tooltip title="退出登录">
                            <Icon type="poweroff" style={{cursor: 'pointer'}} onClick={this.showLogoutModal}/>
                        </Tooltip>
                    </Col>
                </Row>
            </Header>
        </div>);
    }
}

export default connect(stateToProps, stateToDispatch)(adminHeader);
