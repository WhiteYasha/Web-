import React, {Component} from 'react';
import './Contactmessage.css';
import {Form, Button, Input, Icon} from 'antd';
import 'antd/lib/button/style/css';
import 'antd/lib/form/style/css';
import 'antd/lib/input/style/css';

const {TextArea} = Input;

class Contactmessage extends Component {
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div style={{
                margin: '0 20%',
                background: '#fff',
                padding: '5%'
            }}>
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
                                    message: "请输入联系电话!"
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
                        <Button htmlType="submit">
                            <Icon type="check" />提交
                        </Button>
                        <Button htmlType="reset">
                            <Icon type="redo" />重置
                        </Button>
                    </Button.Group>
                </Form.Item>
            </Form>
        </div>);
    }
}

export default Form.create()(Contactmessage);
