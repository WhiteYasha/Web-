import React, {Component} from 'react';
import {
    Button,
    message,
    Row,
    Col
} from 'antd';
import 'antd/lib/row/style/css';
import 'antd/lib/button/style/css';
import axios from 'axios';
import {connect} from 'react-redux';
import {addNews} from './../../../action/adminReducer.js';
import EditNews from './../../../component/Admin/EditNews/EditNews';

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
            visible: false,
            defaultNews: saveNews
        };
    }
    clear = () => {
        this.refs.newsContent.refs.titleInput.state.value = "";
        this.refs.newsContent.refs.authorInput.state.value = "";
        this.refs.newsContent.refs.sourceInput.state.value = "";
        this.refs.newsContent.editor.txt.clear();
        localStorage.removeItem("newsContent");
        this.refs.newsContent.setState({
            newsTitle: "",
            newsAuthor: "",
            newsSource: "",
            newsTag: "company",
            editorContent: ""
        });
    }
    handleSubmit = (e) => {
        let news = {
            id: this.props.newsList.length > 0 ? this.props.newsList[0].id + 1 : 1,
            tag: this.refs.newsContent.state.tag,
            title: this.refs.newsContent.state.title,
            author: this.refs.newsContent.state.author,
            source: this.refs.newsContent.state.source,
            content: this.refs.newsContent.state.content,
            date: this.refs.newsContent.state.date,
            views: 0
        };
        if (!checkInputLength("新闻标题", news.title, 50, 1)) return ;
        if (!checkInputLength("新闻作者", news.author, 15)) return ;
        if (!checkInputLength("新闻来源", news.source, 15)) return ;
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
            title: this.refs.newsContent.state.title,
            tag: this.refs.newsContent.state.tag,
            author: this.refs.newsContent.state.author,
            source: this.refs.newsContent.state.source,
            content: this.refs.newsContent.state.content
        };
        localStorage.setItem("newsContent", JSON.stringify(newsContent));
        message.success("保存成功!");
    }
    render() {
        return (
            <div>
                <EditNews
                    ref="newsContent"
                    defaultValue={this.state.defaultNews}
                />
                <Row gutter={16} style={{marginTop: '16px'}}>
                    <Col span={5} offset={19}>
                        <Button.Group>
                            <Button type="primary" onClick={this.handleSubmit} loading={this.state.loading}>发布</Button>
                            <Button onClick={this.handleSave} loading={this.state.loading}>保存</Button>
                            <Button onClick={this.clear}>清空</Button>
                        </Button.Group>
                    </Col>
                </Row>
            </div>
        );
    }
};

export default connect(stateToProps, stateToDispatch)(AddNews);
