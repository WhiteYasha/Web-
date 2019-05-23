import React, {Component} from 'react';
import {
    Layout,
    Table,
    Divider,
    Modal,
    Row,
    Col,
    Button,
    message
} from 'antd';
import 'antd/lib/row/style/css';
import 'antd/lib/button/style/css';
import {connect} from 'react-redux';
import {deleteRecruit} from './../../../action/adminReducer.js';
import axios from 'axios';

const {Content} = Layout;
const stateToProps = state => ({recruitList: state.recruitList});
const stateToDispatch = dispatch => {
    return {
        doDeleteRecruit: (id) => {
            dispatch(deleteRecruit(id));
        }
    };
};

class ManageRecruit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteVisible: false,
            contentVisible: false,
            loading: false,
            selectRecruit: null
        };
    }
    handleWatch = (recruit) => {
        this.setState({contentVisible: true, selectRecruit: recruit});
    }
    showDeleteConfirm(selectID) {
        let self = this;
        Modal.confirm({
            title: '删除招聘信息',
            content: '确定要删除这条招聘信息吗?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                self.setState({loading: true});
                self.props.doDeleteRecruit(selectID);
                axios.get("http://localhost:9001/deleteRecruit", {params: {id: selectID}})
                .then(() => {
                    message.success("删除成功!");
                    self.setState({loading: false, selectID: -1});
                });
            }
        });
    }
    columns = [
        {
            title: '职位名称',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '部门',
            dataIndex: 'department',
            key: 'department'
        }, {
            title: '工作地点',
            dataIndex: 'position',
            key: 'position'
        }, {
            title: '开始时间',
            dataIndex: 'startDate',
            key: 'startDate',
            sorter: (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        }, {
            title: '结束时间',
            dataIndex: 'endDate',
            key: 'endDate',
            sorter: (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
        }, {
            key: 'action',
            render: (text, record) => (<span>
                <a onClick={() => this.handleWatch(text)}>查看详情</a>
                <Divider type="vertical"/>
                <a>编辑</a>
                <Divider type="vertical"/>
                <a onClick={() => this.showDeleteConfirm(text.id)}>删除</a>
            </span>)
        }
    ];
    render() {
        return (<Content style={{
                padding: '16px calc(100% / 24)'
            }}>
            <div style={{
                    background: '#fff',
                    border: '1px solid #ccc',
                    height: 'auto',
                    padding: '5%'
                }}>
                <Table loading={this.state.loading} columns={this.columns} dataSource={this.props.recruitList} rowKey="id"/>
                <Modal width={1024} visible={this.state.contentVisible} title={this.state.selectRecruit
                        ? this.state.selectRecruit.name
                        : ""} footer={[<Button key="modalButton" type="primary" onClick={() => this.setState({contentVisible: false})}>确定</Button>
                        ]} onCancel={() => this.setState({contentVisible: false})}>
                    <Row gutter={16}>
                        <Col span={2}>工作地点</Col>
                        <Col span={6}>{
                                this.state.selectRecruit
                                    ? this.state.selectRecruit.position
                                    : ""
                            }</Col>
                        <Col span={2}>开始时间</Col>
                        <Col span={6}>{
                                this.state.selectRecruit
                                    ? this.state.selectRecruit.startDate
                                    : ""
                            }</Col>
                        <Col span={2}>结束时间</Col>
                        <Col span={6}>{
                                this.state.selectRecruit
                                    ? this.state.selectRecruit.endDate
                                    : ""
                            }</Col>
                    </Row>
                    <Divider/>
                    <Row style={{
                            marginTop: '16px'
                        }}>
                        <Col span={24}>
                            <div dangerouslySetInnerHTML={{
                                    __html: this.state.selectRecruit
                                        ? this.state.selectRecruit.content
                                        : ""
                                }}/>
                        </Col>
                    </Row>
                </Modal>
            </div>
        </Content>);
    }
}

export default connect(stateToProps, stateToDispatch)(ManageRecruit);
