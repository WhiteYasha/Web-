import React, {Component} from 'react';
import './Contactmessage.css';
import {Form, Button, Input, Icon, message} from 'antd';
import 'antd/lib/button/style/css';
import 'antd/lib/message/style/css';
import 'antd/lib/form/style/css';
import 'antd/lib/input/style/css';
import axios from 'axios';

const {TextArea} = Input;

class Contactmessage extends Component {
    loading = false;
    handleSubmit = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let name = this.props.form.getFieldValue("name"),
                    phone = this.props.form.getFieldValue("phone"),
                    content = this.props.form.getFieldValue("content");
                let data = {
                    params: {
                        name: name,
                        phone: phone,
                        content: content
                    }
                };
                this.loading = true;
                axios.get("http://localhost:9000/addMessage", data)
                .then(() => {
                    message.success("感谢您的反馈!");
                    this.handleInit();
                });
                this.loading = false;
            }
        });
    }
    handleInit = (e) => {
        this.props.form.resetFields();
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div id="messagebox" style={{margin: '0 20%', background: '#fff', padding: '5%'}}>
            <Form labelAlign="left">
                <Form.Item label="姓名">
                    {
                        getFieldDecorator("name", {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入姓名!"
                                }
                            ]
                        })(<Input style={{width: '50%'}}/>)
                    }
                </Form.Item>
                <Form.Item label="联系电话">
                    {
                        getFieldDecorator("phone", {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入正确的联系电话!"
                                }
                            ]
                        })(<Input style={{width: '50%'}}/>)
                    }
                </Form.Item>
                <Form.Item label="内容">
                    {
                        getFieldDecorator("content", {
                            rules: [{
                                max: 140, message: "内容过长!"
                            }, {
                                required: true, message: "内容不能为空!"
                            }]
                        })(
                            <TextArea rows={4} />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Button.Group>
                        <Button htmlType="submit" onClick={this.handleSubmit} loading={this.loading}>
                            <Icon type="check" />提交
                        </Button>
                        <Button htmlType="reset" onClick={this.handleInit}>
                            <Icon type="redo" />重置
                        </Button>
                    </Button.Group>
                </Form.Item>
            </Form>
        </div>);
    }
}

export default Form.create()(Contactmessage);
