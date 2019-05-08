import React, {Component} from 'react';
import {Layout, Form, Input, Button} from 'antd';
import 'antd/lib/layout/style/css';
import 'antd/lib/form/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import E from 'wangeditor';

const {Content} = Layout;

class AddNews extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editorContent: ''
        }
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 2
                }
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 22
                }
            }
        };
        return (<Content style={{
                padding: '16px calc(100% / 24)'
            }}>
            <Form layout="vertical" {...formItemLayout}>
                <Form.Item label="标题">
                    {getFieldDecorator('title', {
                        rules: [{
                            required: true, message: '请输入标题!'
                        }]
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label="内容">
                    <div ref="editorElem" style={{
                            textAlign: 'left',
                            background: '#fff'
                        }}/>
                </Form.Item>
                <Form.Item wrapperCol={{span: 4, offset: 20}}>
                    <Button type="primary">发布</Button>
                    <Button style={{marginLeft: '1em'}}>保存</Button>
                </Form.Item>
            </Form>
        </Content>);
    }
    componentDidMount() {
        const elem = this.refs.editorElem;
        const editor = new E(elem);
        editor.customConfig.onchange = html => {
            this.setState({editorContent: html});
        };
        editor.customConfig.uploadImgServer = 'http://localhost:9000/uploadNewsImg';
        editor.customConfig.uploadFileName = 'newsImg';
        editor.customConfig.uploadImgHooks = {
            customInsert: function(insertImg, result, editor) {
                var url = result.data[0];
                insertImg(url);
            }
        }
        editor.create();
    }
};

export default Form.create()(AddNews);
