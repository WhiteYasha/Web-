import React, {Component} from 'react';
import {Table, Divider, Modal, Icon, message} from 'antd';
import 'antd/lib/divider/style/css';
import {connect} from 'react-redux';
import axios from 'axios';
import {deleteNews, updateNews} from './../../../action/adminReducer.js';
import EditNews from './../../../component/Admin/EditNews/EditNews';

const stateToProps = state => ({newsList: state.newsList});
const stateToDispatch = dispatch => {
    return {
        doDeleteNews: (id) => {
            dispatch(deleteNews(id));
        },
        doUpdateNews: (news) => {
            dispatch(updateNews(news));
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

class ManageNews extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: false, visible: false, selectNews: null};
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
                    <a onClick={() => this.handleEdit(text)}>
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
    handleEdit = (news) => {
        this.setState({visible: true, selectNews: news});
    }
    handleUpdate = () => {
        let news = {
            id: this.refs.newsContent.state.id,
            tag: this.refs.newsContent.state.tag,
            title: this.refs.newsContent.state.title,
            author: this.refs.newsContent.state.author,
            source: this.refs.newsContent.state.source,
            content: this.refs.newsContent.state.content,
            date: this.refs.newsContent.state.date,
            views: this.refs.newsContent.state.views
        };
        if (!checkInputLength("新闻标题", news.title, 50, 1)) return ;
        if (!checkInputLength("新闻作者", news.author, 15)) return ;
        if (!checkInputLength("新闻来源", news.source, 15)) return ;
        this.setState({loading: true});
        this.props.doUpdateNews(news);
        axios.get("http://localhost:9001/updateNews", {params: news}).then(() => {
            message.success("发布成功!");
            this.setState({loading: false, visible: false, selectNews: null});
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
                <Modal
                    title="编辑新闻"
                    visible={this.state.visible}
                    width={1024}
                    okText="确定修改"
                    cancelText="取消"
                    onOk={this.handleUpdate}
                    onCancel={() => this.setState({visible: false})}
                    destroyOnClose
                >
                    <EditNews
                        ref="newsContent"
                        defaultValue={this.state.selectNews}
                    />
                </Modal>
            </div>);
    }
}

export default connect(stateToProps, stateToDispatch)(ManageNews);
