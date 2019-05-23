import React, {Component} from 'react';
import {Table, Divider, Modal, Icon, message} from 'antd';
import 'antd/lib/divider/style/css';
import {connect} from 'react-redux';
import axios from 'axios';
import {deleteNews} from './../../../action/adminReducer.js';

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
        this.state = {loading: false};
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
                {text: '公司新闻', value: '公司新闻'},
                {text: '行业新闻', value: '行业新闻'},
                {text: '媒体新闻', value: '媒体新闻'},
                {text: '员工天地', value: '员工天地'},
                {text: '荣誉资质', value: '荣誉资质'}
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
            render: (text, record) => (
                <span>
                    <a>
                        <Icon type="edit"/>编辑
                    </a>
                    <Divider type="vertical"/>
                    <a onClick={() => this.showDeleteModal(text.id)}>
                        <Icon type="delete" />删除
                    </a>
                </span>
            )
        }
    ];
    showDeleteModal = (id) => {
        const self = this;
        Modal.confirm({
            title: "删除新闻",
            content: "确定要删除这条新闻吗?",
            okText: "确定",
            okType: "danger",
            cancelText: "取消",
            onOk() {
                self.setState({loading: true});
                self.props.doDeleteNews(id);
                axios.get("http://localhost:9001/deleteNews", {params: {id: id}}).then(() => {
                    message.success("删除成功!");
                    self.setState({loading: false});
                });
            }
        });
    }
    render() {
        return (
            <div>
                <Table
                    loading={this.state.loading}
                    bordered
                    columns={this.columns}
                    dataSource={this.props.newsList}
                    rowKey="id"
                />
            </div>);
    }
}

export default connect(stateToProps, stateToDispatch)(ManageNews);
