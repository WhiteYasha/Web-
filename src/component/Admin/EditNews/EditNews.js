import React, {Component} from 'react';
import {
    Input,
    Row,
    Col,
    Select
} from 'antd';
import 'antd/lib/row/style/css';
import 'antd/lib/button/style/css';
import E from 'wangeditor';
import moment from 'moment';

const formatDatetime = "YYYY/MM/DD HH:mm:ss";

class EditNews extends Component {
    editor;
    constructor(props, context) {
        super(props, context);
        this.state = {
            id: this.props.defaultValue ? this.props.defaultValue.id : 0,
            title: this.props.defaultValue ? this.props.defaultValue.title : "",
            author: this.props.defaultValue ? this.props.defaultValue.author : "",
            source: this.props.defaultValue ? this.props.defaultValue.source : "",
            tag: this.props.defaultValue ? this.props.defaultValue.tag : "公司新闻",
            date: this.props.defaultValue ? this.props.defaultValue.date : moment().format(formatDatetime),
            content: this.props.defaultValue ? this.props.defaultValue.content : "",
            views: this.props.defaultValue ? this.props.defaultValue.views : 0
        }
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
                            defaultValue={this.state.title}
                            onChange={(e) => this.setState({title: e.target.value})}
                            ref="titleInput"
                        />
                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop: '16px'}}>
                    <Col span={2}>作者</Col>
                    <Col span={6}>
                        <Input
                            defaultValue={this.state.author}
                            onChange={(e) => this.setState({author: e.target.value})}
                            ref="authorInput"
                        />
                    </Col>
                    <Col span={2}>来源</Col>
                    <Col span={6}>
                        <Input
                            defaultValue={this.state.source}
                            onChange={(e) => this.setState({source: e.target.value})}
                            ref="sourceInput"
                        />
                    </Col>
                    <Col span={2}>标签</Col>
                    <Col span={6}>
                        <Select
                            defaultValue={this.state.tag}
                            onChange={(value) => this.setState({tag: value})}
                            style={{width: '100%', zIndex: 999}}
                        >
                            <Select.Option value="公司新闻">公司新闻</Select.Option>
                            <Select.Option value="行业新闻">行业新闻</Select.Option>
                            <Select.Option value="媒体新闻">媒体新闻</Select.Option>
                            <Select.Option value="员工天地">员工天地</Select.Option>
                            <Select.Option value="荣誉资质">荣誉资质</Select.Option>
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
            </div>);
    }
    componentDidMount() {
        const elem = this.refs.editorElem;
        this.editor = new E(elem);
        this.editor.customConfig.onchange = html => {
            this.setState({content: html});
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
        if (this.state.content !== "") {
            this.editor.txt.html(this.state.content);
        }
    }
};

export default EditNews;
