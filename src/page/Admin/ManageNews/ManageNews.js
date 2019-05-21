import React, {Component} from 'react';
import {Layout, Table, Divider, Modal, Icon} from 'antd';
import 'antd/lib/layout/style/css';
import 'antd/lib/modal/style/css';
import 'antd/lib/table/style/css';
import 'antd/lib/divider/style/css';
import {connect} from 'react-redux';
import axios from 'axios';
import {deleteNews} from './../../../action/adminReducer.js';

const {Content} = Layout;
const stateToProps = state => ({newsList: state.newsList});
const stateToDispatch = dispatch => {
    return {
        doDeleteNews: (id) => {
            dispatch(deleteNews(id));
        }
    };
};

class ManageNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            focusID: -1
        };
    }
    columns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title'
        }, {
            title: '分类',
            dataIndex: 'tag',
            key: 'tag',
            filters: [
                {
                    text: '公司新闻',
                    value: '公司新闻'
                }, {
                    text: '行业新闻',
                    value: '行业新闻'
                }, {
                    text: '媒体新闻',
                    value: '媒体新闻'
                }, {
                    text: '员工天地',
                    value: '员工天地'
                }, {
                    text: '荣誉资质',
                    value: '荣誉资质'
                }
            ],
            onFilter: (value, record) => record.tag === value
        }, {
            title: '发布日期',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        }, {
            title: '浏览数',
            dataIndex: 'views',
            key: 'views',
            sorter: (a, b) => a.views - b.views
        }, {
            title: '管理',
            key: 'action',
            render: (text, record) => (<span>
                <a><Icon type="edit"/>编辑</a>
                <Divider type="vertical"/>
                <a onClick={() => this.setState({visible: true, focusID: record.id})}><Icon type="delete" />删除</a>
            </span>)
        }
    ];
    handleDelete = (e) => {
        let id = this.state.focusID;
        let data = {
            params: {
                id: id
            }
        };
        this.props.doDeleteNews(id);
        axios.get("http://localhost:9001/deleteNews", data).then(() => {
            this.setState({visible: false, focusID: -1});
        });
    }
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
                <Modal title="删除新闻" visible={this.state.visible} okText="确定" cancelText="取消" onOk={this.handleDelete} onCancel={() => this.setState({visible: false})}>
                    <p>确定要删除吗?</p>
                </Modal>
                <Table bordered columns={this.columns} dataSource={this.props.newsList} style={{
                        background: '#fff'
                    }} rowKey="id"/>
            </div>
        </Content>);
    }
}

export default connect(stateToProps, stateToDispatch)(ManageNews);
