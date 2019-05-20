import React, {Component} from 'react';
import {
    Layout,
    Input,
    Button,
    message,
    Row,
    Col,
    Select
} from 'antd';
import 'antd/lib/layout/style/css';
import 'antd/lib/row/style/css';
import 'antd/lib/select/style/css';
import 'antd/lib/message/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import axios from 'axios';
import E from 'wangeditor';
import {connect} from 'react-redux';
import {addNews} from './../../../action/adminReducer.js';

const {Content} = Layout;
const stateToProps = state => ({newsList: state.newsList});
const stateToDispatch = dispatch => {
    return {
        doAddNews: (news) => {
            dispatch(addNews(news));
        }
    }
};

function formatDatetime() {
    let now = new Date();
    let year = now.getFullYear(),
        month = now.getMonth() + 1,
        day = now.getDate(),
        hour = now.getHours(),
        minute = now.getMinutes(),
        second = now.getSeconds();
    var temp = `${year}-${month < 10
        ? '0'
        : ''}${month}-${day < 10
            ? '0'
            : ''}${day}`;
    temp += ` ${hour < 10
        ? '0'
        : ''}${hour}:${minute < 10
            ? '0'
            : ''}${minute}:${second < 10
                ? '0'
                : ''}${second}`;
    return temp;
}

class AddNews extends Component {
    editor;
    constructor(props, context) {
        super(props, context);
        let saveNews = JSON.parse(localStorage.getItem("newsContent")) === null;
        this.state = {
            newsTitle: saveNews
                ? ""
                : JSON.parse(localStorage.getItem("newsContent")).title,
            newsAuthor: saveNews
                ? ""
                : JSON.parse(localStorage.getItem("newsContent")).author,
            newsSource: saveNews
                ? ""
                : JSON.parse(localStorage.getItem("newsContent")).source,
            newsTag: saveNews
                ? "company"
                : JSON.parse(localStorage.getItem("newsContent")).tag,
            editorContent: saveNews
                ? ""
                : JSON.parse(localStorage.getItem("newsContent")).content
        }
    }
    handleSubmit = (e) => {
        let title = this.state.newsTitle,
            author = this.state.newsAuthor,
            source = this.state.newsSource,
            tag = "公司新闻",
            content = this.state.editorContent;
        if (title === "") {
            message.error("标题不能为空!");
            return;
        }
        if (this.state.newsTag === "company")
            tag = "公司新闻";
        else if (this.state.newsTag === "industry")
            tag = "行业新闻";
        else if (this.state.newsTag === "media")
            tag = "媒体新闻";
        else if (this.state.newsTag === "employee")
            tag = "员工天地";
        else if (this.state.newsTag === "hornor")
            tag = "荣誉资质";
        let news = {
            id: this.props.newsList[0].id + 1,
            tag: tag,
            title: title,
            author: author,
            source: source,
            content: content,
            date: formatDatetime(),
            views: 0
        };
        this.props.doAddNews(news);
        axios.get("http://localhost:9001/addNews", {params: news}).then(() => {
            this.editor.txt.clear();
            localStorage.removeItem("newsContent");
            message.success("发布成功!");
        });
    }
    handleSave = (e) => {
        let newsContent = {
            title: this.state.newsTitle,
            tag: this.state.newsTag,
            author: this.state.newsAuthor,
            source: this.state.newsSource,
            content: this.state.editorContent
        };
        localStorage.setItem("newsContent", JSON.stringify(newsContent));
        message.success("保存成功!");
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
                <Row style={{
                        margin: '1em 0'
                    }}>
                    <Col span={2} style={{
                            textAlign: 'center'
                        }}>标题</Col>
                    <Col span={22}>
                        <Input defaultValue={this.state.newsTitle} onChange={(e) => this.setState({newsTitle: e.target.value})}/>
                    </Col>
                </Row>
                <Row style={{
                        margin: '1em 0'
                    }}>
                    <Col span={2} style={{
                            textAlign: 'center'
                        }}>作者</Col>
                    <Col span={6}>
                        <Input defaultValue={this.state.newsAuthor} onChange={(e) => this.setState({newsAuthor: e.target.value})}/>
                    </Col>
                    <Col span={2} style={{
                            textAlign: 'center'
                        }}>来源</Col>
                    <Col span={6}>
                        <Input defaultValue={this.state.newsSource} onChange={(e) => this.setState({newsSource: e.target.value})}/>
                    </Col>
                    <Col span={2} style={{
                            textAlign: 'center'
                        }}>
                        标签
                    </Col>
                    <Col span={6}>
                        <Select defaultValue={this.state.newsTag} onChange={(value) => this.setState({newsTag: value})} style={{
                                width: '100%',
                                zIndex: 999
                            }}>
                            <Select.Option value="company">公司新闻</Select.Option>
                            <Select.Option value="industry">行业新闻</Select.Option>
                            <Select.Option value="media">媒体新闻</Select.Option>
                            <Select.Option value="employee">员工天地</Select.Option>
                            <Select.Option value="hornor">荣誉资质</Select.Option>
                        </Select>
                    </Col>
                </Row>
                <div id="editArea" ref="editorElem" style={{
                        textAlign: 'left',
                        background: '#fff'
                    }}/>
                <Row style={{
                        margin: '1em 0'
                    }}>
                    <Col offset={20} span={4}>
                        <Button.Group>
                            <Button type="primary" onClick={this.handleSubmit}>发布</Button>
                            <Button onClick={this.handleSave}>保存</Button>
                        </Button.Group>
                    </Col>
                </Row>
            </div>
        </Content>);
    }
    componentDidMount() {
        const elem = this.refs.editorElem;
        this.editor = new E(elem);
        this.editor.customConfig.onchange = html => {
            this.setState({editorContent: html});
        };
        this.editor.customConfig.zIndex = 100;
        this.editor.customConfig.uploadImgServer = 'http://localhost:9000/uploadNewsImg';
        this.editor.customConfig.uploadFileName = 'newsImg';
        this.editor.customConfig.uploadImgHooks = {
            customInsert: function(insertImg, result, editor) {
                var url = result.data[0];
                insertImg(url);
            }
        }
        this.editor.create();
        if (JSON.parse(localStorage.getItem("newsContent")) !== null) {
            this.editor.txt.html(JSON.parse(localStorage.getItem("newsContent")).content);
        }
    }
};

export default connect(stateToProps, stateToDispatch)(AddNews);
