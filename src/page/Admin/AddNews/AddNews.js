import React, {Component} from 'react';
import {
    Layout,
    Input,
    Button,
    message,
    Row,
    Col
} from 'antd';
import 'antd/lib/layout/style/css';
import 'antd/lib/row/style/css';
import 'antd/lib/message/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import E from 'wangeditor';

const {Content} = Layout;

class AddNews extends Component {
    editor;
    constructor(props, context) {
        super(props, context);
        this.state = {
            newsTitle: JSON.parse(localStorage.getItem("newsContent")) === null
                ? ""
                : JSON.parse(localStorage.getItem("newsContent")).title,
            newsAuthor: JSON.parse(localStorage.getItem("newsContent")) === null
                ? ""
                : JSON.parse(localStorage.getItem("newsContent")).author,
            newsResource: JSON.parse(localStorage.getItem("newsContent")) === null
                ? ""
                : JSON.parse(localStorage.getItem("newsContent")).resource,
            editorContent: JSON.parse(localStorage.getItem("newsContent")) === null
                ? ""
                : JSON.parse(localStorage.getItem("newsContent")).content
        }
    }
    handleSubmit = (e) => {
        this.props.form.validateFields((err, values) => {
            let data = {
                params: {
                    title: values.title,
                    content: this.state.editorContent
                }
            };

        });
    }
    handleSave = (e) => {
        let newsContent = {
            title: this.props.form.getFieldValue("title"),
            content: this.state.editorContent
        };
        localStorage.setItem("newsContent", JSON.stringify(newsContent));
        message.success("保存成功!");
    }
    handleClear = (e) => {
        this.setState({newsTitle: '', newsAuthor: '', newsResource: '', ditorContent: ''});
        this.editor.txt.clear();
        localStorage.removeItem("newsContent");
    }
    render() {
        return (<Content style={{
                padding: '16px calc(100% / 24)'
            }}>
                <Row style={{margin: '1em 0'}}>
                    <Col span={2} style={{textAlign: 'center'}}>标题</Col>
                    <Col span={22}>
                        <Input defaultValue={this.state.newsTitle} onChange={(e) => this.setState({newsTitle: e.target.value})}/>
                    </Col>
                </Row>
                <Row style={{margin: '1em 0'}}>
                    <Col span={2} style={{textAlign: 'center'}}>作者</Col>
                    <Col span={10}>
                        <Input defaultValue={this.state.newsAuthor} onChange={(e) => this.setState({newsAuthor: e.target.value})}/>
                    </Col>
                    <Col span={2} style={{textAlign: 'center'}}>来源</Col>
                    <Col span={10}>
                        <Input defaultValue={this.state.newsResource} onChange={(e) => this.setState({newsResource: e.target.value})} />
                    </Col>
                </Row>
                <div id="editArea" ref="editorElem" style={{
                        textAlign: 'left',
                        background: '#fff'
                    }}/>
                <Row style={{margin: '1em 0'}}>
                    <Col offset={20} span={4}>
                        <Button.Group>
                            <Button type="primary" onClick={this.handleSubmit}>发布</Button>
                            <Button onClick={this.handleSave}>保存</Button>
                            <Button onClick={this.handleClear}>清空</Button>
                        </Button.Group>
                    </Col>
                </Row>
        </Content>);
    }
    componentDidMount() {
        const elem = this.refs.editorElem;
        this.editor = new E(elem);
        this.editor.customConfig.onchange = html => {
            this.setState({editorContent: html});
        };
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

export default AddNews;
