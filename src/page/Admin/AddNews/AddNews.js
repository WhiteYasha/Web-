import React, {Component} from 'react';
import {
    Input,
    Button,
    message,
    Row,
    Col,
    Select
} from 'antd';
import 'antd/lib/row/style/css';
import 'antd/lib/button/style/css';
import axios from 'axios';
import E from 'wangeditor';
import {connect} from 'react-redux';
import {addNews} from './../../../action/adminReducer.js';
import moment from 'moment';

const formatDatetime = "YYYY/MM/DD HH:mm:ss";
const stateToProps = state => ({newsList: state.newsList});
const stateToDispatch = dispatch => {
    return {
        doAddNews: (news) => {
            dispatch(addNews(news));
        }
    }
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

class AddNews extends Component {
    editor;
    constructor(props, context) {
        super(props, context);
        let saveNews = JSON.parse(localStorage.getItem("newsContent"));
        this.state = {
            loading: false,
            newsTitle: saveNews ? saveNews.title : "",
            newsAuthor: saveNews ? saveNews.author : "",
            newsSource: saveNews ? saveNews.source : "",
            newsTag: saveNews ? saveNews.tag : "company",
            editorContent: saveNews ? saveNews.content : ""
        }
    }
    clear = () => {
        this.refs.titleInput.state.value = "";
        this.refs.authorInput.state.value = "";
        this.refs.sourceInput.state.value = "";
        this.editor.txt.clear();
        localStorage.removeItem("newsContent");
        this.setState({
            newsTitle: "",
            newsAuthor: "",
            newsSource: "",
            newsTag: "",
            editorContent: ""
        });
    }
    handleSubmit = (e) => {
        let title = this.state.newsTitle,
            author = this.state.newsAuthor,
            source = this.state.newsSource,
            tag = "公司新闻",
            content = this.state.editorContent;
        if (!checkInputLength("新闻标题", title, 50, 1)) return ;
        if (!checkInputLength("新闻作者", author, 15)) return ;
        if (!checkInputLength("新闻来源", source, 15)) return ;
        switch (this.state.newsTag) {
            case "industry": {
                tag = "行业新闻";
                break;
            }
            case "media": {
                tag = "媒体新闻";
                break;
            }
            case "employee": {
                tag = "员工天地";
                break;
            }
            case "hornor": {
                tag = "荣誉资质";
                break;
            }
            default:
                tag = "公司新闻";
        }
        let news = {
            id: this.props.newsList.length > 0 ? this.props.newsList[0].id + 1 : 1,
            tag: tag,
            title: title,
            author: author,
            source: source,
            content: content,
            date: moment().format(formatDatetime),
            views: 0
        };
        this.setState({loading: true});
        this.props.doAddNews(news);
        axios.get("http://localhost:9001/addNews", {params: news}).then(() => {
            message.success("发布成功!");
            this.clear();
            this.setState({loading: false});
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
        return (
            <div>
                <Row gutter={16}>
                    <Col span={2}>
                        标题<span style={{color: 'red'}}>*</span>
                    </Col>
                    <Col span={22}>
                        <Input
                            defaultValue={this.state.newsTitle}
                            onChange={(e) => this.setState({newsTitle: e.target.value})}
                            ref="titleInput"
                        />
                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop: '16px'}}>
                    <Col span={2}>作者</Col>
                    <Col span={6}>
                        <Input
                            defaultValue={this.state.newsAuthor}
                            onChange={(e) => this.setState({newsAuthor: e.target.value})}
                            ref="authorInput"
                        />
                    </Col>
                    <Col span={2}>来源</Col>
                    <Col span={6}>
                        <Input
                            defaultValue={this.state.newsSource}
                            onChange={(e) => this.setState({newsSource: e.target.value})}
                            ref="sourceInput"
                        />
                    </Col>
                    <Col span={2}>标签</Col>
                    <Col span={6}>
                        <Select
                            defaultValue={this.state.newsTag}
                            onChange={(value) => this.setState({newsTag: value})}
                            style={{width: '100%', zIndex: 999}}
                        >
                            <Select.Option value="company">公司新闻</Select.Option>
                            <Select.Option value="industry">行业新闻</Select.Option>
                            <Select.Option value="media">媒体新闻</Select.Option>
                            <Select.Option value="employee">员工天地</Select.Option>
                            <Select.Option value="hornor">荣誉资质</Select.Option>
                        </Select>
                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop: '16px'}}>
                    <Col span={24}>
                        <div
                            id="editArea"
                            ref="editorElem"
                            style={{textAlign: 'left'}}
                        />
                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop: '16px'}}>
                    <Col span={5} offset={19}>
                        <Button.Group>
                            <Button type="primary" onClick={this.handleSubmit} loading={this.state.loading}>发布</Button>
                            <Button onClick={this.handleSave} loading={this.state.loading}>保存</Button>
                            <Button onClick={this.clear}>清空</Button>
                        </Button.Group>
                    </Col>
                </Row>
            </div>);
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
