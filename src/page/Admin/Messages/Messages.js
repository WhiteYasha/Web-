import React, {Component} from 'react';
import {
    Layout,
    Table,
    Tag,
    Modal,
    Button,
    Row,
    Col
} from 'antd';
import 'antd/lib/table/style/css';
import 'antd/lib/row/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/modal/style/css';
import 'antd/lib/layout/style/css';
import 'antd/lib/tag/style/css';
import axios from 'axios';
import {connect} from 'react-redux';
import {readMessages} from './../../../action/adminReducer.js';

const {Content} = Layout;
const stateToProps = state => ({messageList: state.messageList});
const stateToDispatch = dispatch => {
    return {
        doReadMessages: (ids) => {
            dispatch(readMessages(ids));
        }
    };
};

class Messages extends Component {
    columns = [
        {
            title: '状态',
            dataIndex: 'watched',
            render: (text, record) => (<Tag color={record.watched
                    ? "#87d068"
                    : "#f50"}>{
                    record.watched
                        ? "已读"
                        : "未读"
                }</Tag>),
            filters: [
                {
                    text: '已读',
                    value: 1
                }, {
                    text: '未读',
                    value: 0
                }
            ],
            onFilter: (value, record) => record.watched === value
        }, {
            title: '姓名',
            dataIndex: 'name'
        }, {
            title: '电话号码',
            dataIndex: 'phone'
        }, {
            title: '留言时间',
            dataIndex: 'date',
            sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        }, {
            render: (text, record) => (<a onClick={() => this.handleClick(record)}>查看详情</a>)
        }
    ]
    constructor(props) {
        super(props);
        this.state = {
            selectedID: [],
            watchMessage: null,
            visible: false,
            readButtonLoading: false,
            readAllButtonLoading: false
        };
    }
    handleChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedID: selectedRows.map((item) => item.id)
        });
    };
    handleClick = (record) => {
        let id = [record.id];
        let data = {
            params: {
                id: id
            }
        };
        this.props.doReadMessages(id);
        axios.get("http://localhost:9000/readMessages", data).then(() => {
            this.setState({visible: true, watchMessage: record});
        });
    }
    handleRead = (e) => {
        let id = this.state.selectedID;
        let data = {
            params: {
                id: id
            }
        };
        this.setState({readButtonLoading: true});
        this.props.doReadMessages(id);
        axios.get("http://localhost:9000/readMessages", data).then(() => {
            this.setState({readButtonLoading: false});
        });
    }
    handleReadAll = (e) => {
        let id = this.props.messageList.filter((item) => item.watched === 0).map((item) => item.id);
        this.setState({readAllButtonLoading: true});
        this.props.doReadMessages(id);
        axios.post("http://localhost:9000/readAllMessages").then(() => {
            this.setState({readAllButtonLoading: false});
        });
    }
    render() {
        const {selectedID} = this.state;
        const rowSelection = {
            selectedID,
            onChange: this.handleChange
        };
        return (<Content style={{
                padding: '16px 0'
            }}>
            <Modal visible={this.state.visible} title="留言详情" footer={null} onCancel={() => this.setState({visible: false})}>
                {
                    this.state.watchMessage === null
                        ? ""
                        : this.state.watchMessage.content
                }
            </Modal>
            <Row>
                <Col offset={1} span={2}>
                    <Button type="primary" disabled={this.state.selectedID.length === 0} onClick={this.handleRead} loading={this.state.readButtonLoading}>已读</Button>
                </Col>
                <Col span={2}>
                    <Button type="primary" onClick={this.handleReadAll} loading={this.state.readAllButtonLoading}>全部已读</Button>
                </Col>
            </Row>
            <Row style={{
                    marginTop: '16px'
                }}>
                <Col span={22} offset={1}>
                    <Table style={{
                            background: '#fff'
                        }} columns={this.columns} dataSource={this.props.messageList} rowSelection={rowSelection} pagination={{
                            pageSize: 20
                        }}/>
                </Col>
            </Row>
        </Content>);
    }
}

export default connect(stateToProps, stateToDispatch)(Messages);
