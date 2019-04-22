import React, {Component} from 'react';
import {Table, Modal} from 'antd';
import 'antd/lib/table/style/css';
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
            title: '发布时间',
            dataIndex: 'startDate',
            key: 'startDate'
        }, {
            title: '',
            key: 'more',
            render: (text, record) => (<span>
                <a onClick={() => {
                        this.setState({modalVisible: true, modalContent: text.content, modalTitle: text.title});
                    }}>查看详情</a>
            </span>)
        }
    ];

    constructor() {
        super();
        this.state = {
            modalVisible: false,
            modalContent: "",
            modalTitle: ""
        };
    }
    render() {
        return (
            <div style={{
                background: "rgb(240, 240, 239)",
                padding: '0 0 60px 0'
            }}>
            <div style={{
                    margin: '0 20%',
                    background: '#fff',
                    padding: '1em'
                }}>
                <Table
                    columns={this.columns}
                    dataSource={this.props.recruitList}
                />
                <Modal
                    visible={this.state.modalVisible}
                    title={this.state.modalTitle}
                    onOk={() => this.setState({modalVisible: false})}
                    onCancel={() => this.setState({modalVisible: false})}
                >
                    {this.state.modalContent}
                </Modal>
            </div>
        </div>);
    }
}

export default connect(stateToProps)(Contactrecruit);
