import React, {Component} from 'react';
import {Table, Modal, Row, Col, Divider, Button} from 'antd';
import 'antd/lib/table/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/row/style/css';
import 'antd/lib/modal/style/css';
import {connect} from 'react-redux';

const stateToProps = state => ({recruitList: state.recruitList});

class Contactrecruit extends Component {
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
            title: '开始时间',
            dataIndex: 'startDate',
            key: 'startDate',
            sorter: (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        }, {
            title: '',
            key: 'more',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.setState({modalVisible: true, selectRecruit: text})}>
                        查看详情
                    </a>
                </span>
            )
        }
    ];

    constructor() {
        super();
        this.state = {
            modalVisible: false,
            selectRecruit: null
        };
    }
    render() {
        return (
            <div style={{background: "rgb(240, 240, 239)", padding: '0 0 60px 0'}}>
                <div style={{margin: '0 20%', background: '#fff', padding: '1em'}}>
                    <Table
                        rowKey="id"
                        columns={this.columns}
                        dataSource={this.props.recruitList}
                    />
                    <Modal
                        width={1024}
                        visible={this.state.modalVisible}
                        title={this.state.selectRecruit ? this.state.selectRecruit.name : ""}
                        footer={[
                            <Button type="primary" onClick={() => this.setState({modalVisible: false})}>确定</Button>
                        ]}
                        onCancel={() => this.setState({modalVisible: false})}
                    >
                    <Row gutter={16}>
                        <Col span={2}>工作地点</Col>
                        <Col span={6}>{this.state.selectRecruit ? this.state.selectRecruit.position : ""}</Col>
                        <Col span={2}>开始时间</Col>
                        <Col span={6}>{this.state.selectRecruit ? this.state.selectRecruit.startDate : ""}</Col>
                        <Col span={2}>结束时间</Col>
                        <Col span={6}>{this.state.selectRecruit ? this.state.selectRecruit.endDate : ""}</Col>
                    </Row>
                    <Divider />
                    <Row style={{marginTop: '16px'}}>
                        <Col span={24}>
                            <div dangerouslySetInnerHTML={{__html: this.state.selectRecruit ? this.state.selectRecruit.content : ""}} />
                        </Col>
                    </Row>
                </Modal>
            </div>
        </div>);
    }
}

export default connect(stateToProps)(Contactrecruit);
