import React, {Component} from 'react';
import {
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
import {deleteRecruit, updateRecruit} from './../../../action/adminReducer.js';
import axios from 'axios';
import EditRecruit from './../../../component/Admin/EditRecruit/EditRecruit';

const stateToProps = state => ({recruitList: state.recruitList});
const stateToDispatch = dispatch => {
    return {
        doDeleteRecruit: (id) => {
            dispatch(deleteRecruit(id));
        },
        doUpdateRecruit: (recruit) => {
            dispatch(updateRecruit(recruit));
        }
    };
};

function checkInputLength(name, text, max, min = 0) {
    if (text.length > max) {
        message.error(`${name}最大长度不能超过${max}个字!`);
        return false;
    }
    if (text.length < min) {
        message.error(`${name}最小长度不能少于${min}个字!`);
        return false;
    }
    return true;
}

class ManageRecruit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editVisible: false,
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
            render: (text, record) => (
                <span>
                    <a onClick={() => this.handleWatch(text)}>查看详情</a>
                    <Divider type="vertical"/>
                    <a onClick={() => this.handleEdit(text)}>编辑</a>
                    <Divider type="vertical"/>
                    <a onClick={() => this.showDeleteConfirm(text.id)}>删除</a>
                </span>
            )
        }
    ];
    handleEdit = (recruit) => {
        this.setState({editVisible: true, selectRecruit: recruit});
    }
    handleUpdate = () => {
        let recruitInfo = {
            id: this.refs.recruitContent.state.id,
            name: this.refs.recruitContent.state.name,
            department: this.refs.recruitContent.state.department,
            position: this.refs.recruitContent.state.position,
            startDate: this.refs.recruitContent.state.startDate,
            endDate: this.refs.recruitContent.state.endDate,
            content: this.refs.recruitContent.state.content
        };
        if (!checkInputLength("职位名称", recruitInfo.name, 30, 1)) return ;
        if (!checkInputLength("工作部门", recruitInfo.department, 20, 1)) return ;
        if (!checkInputLength("工作地点", recruitInfo.position, 20)) return ;
        this.setState({loading: true});
        this.props.doUpdateRecruit(recruitInfo);
        axios.get("http://localhost:9001/updateRecruit", {params: recruitInfo})
        .then(() => {
            message.success("修改成功!");
            this.setState({loading: false, editVisible: false, selectRecruit: null});
        });
    }
    render() {
        return (
            <div>
                <Table
                    loading={this.state.loading}
                    columns={this.columns}
                    dataSource={this.props.recruitList}
                    rowKey="id"
                />
                <Modal
                    width={1024}
                    visible={this.state.contentVisible}
                    title={this.state.selectRecruit ? this.state.selectRecruit.name : ""}
                    onCancel={() => this.setState({contentVisible: false})}
                    footer={[
                        <Button key="modalButton" type="primary" onClick={() => this.setState({contentVisible: false})}>
                            确定
                        </Button>
                    ]}
                >
                    <Row gutter={16}>
                        <Col span={2}>工作地点</Col>
                        <Col span={6}>
                            {this.state.selectRecruit ? this.state.selectRecruit.position : ""}
                        </Col>
                        <Col span={2}>开始时间</Col>
                        <Col span={6}>
                            {this.state.selectRecruit ? this.state.selectRecruit.startDate : ""}
                        </Col>
                        <Col span={2}>结束时间</Col>
                        <Col span={6}>
                            {this.state.selectRecruit ? this.state.selectRecruit.endDate : ""}
                        </Col>
                    </Row>
                    <Divider/>
                    <Row style={{marginTop: '16px'}}>
                        <Col span={24}>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: this.state.selectRecruit ? this.state.selectRecruit.content : ""
                                }}
                            />
                        </Col>
                    </Row>
                </Modal>
                <Modal
                    title="编辑招聘信息"
                    visible={this.state.editVisible}
                    width={1024}
                    okText="确认修改"
                    cancelText="取消"
                    onOk={this.handleUpdate}
                    onCancel={() => this.setState({editVisible: false})}
                    destroyOnClose
                >
                    <EditRecruit
                        ref="recruitContent"
                        defaultValue={this.state.selectRecruit}
                    />
                </Modal>
            </div>
        );
    }
}

export default connect(stateToProps, stateToDispatch)(ManageRecruit);
