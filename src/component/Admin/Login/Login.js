import React, {Component} from 'react';
import {Layout, Button, Form, Input, Icon, message} from 'antd';
import 'antd/lib/button/style/css';
import 'antd/lib/message/style/css';
import 'antd/lib/form/style/css';
import 'antd/lib/input/style/css';
import axios from 'axios';
import {connect} from 'react-redux';
import {changeLoginState} from './../../../action/adminReducer.js';

const {Content} = Layout;
const stateToProps = state => ({});
const stateToDispatch = dispatch => {
    return {
        doChangeLoginState: () => {
            dispatch(changeLoginState(true));
        }
    }
}

class Login extends Component {
    handleSubmit = e => {
        let data = {
            params: {
                name: this.props.form.getFieldValue("name"),
                password: this.props.form.getFieldValue("password")
            }
        };
        axios.get("http://localhost:9001/login", data)
        .then((response) => {
            let state = response.data.state;
            if (state === -1) message.error("该用户不存在!");
            else if (state === 0) message.error("密码错误!");
            else {
                message.success("登录成功!");
                this.props.doChangeLoginState();
            }
        });
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        return (<div style={{
                height: '400px',
                width: '500px',
                margin: '200px calc(50% - 250px)'
            }}>
            <Content
                style={{
                    background: '#fafafa',
                    height: '100%',
                    padding: '10%',
                    boxShadow: '0px 0px 10px 5px #aaa',
                    textAlign: 'center'
                }}
            >
                    <Form>
                        <Form.Item>
                            <h1>管理系统</h1>
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator("name", {
                                    rules: [{required: true, message: "请输入用户名!"}]
                                })(
                                    <Input prefix={<Icon type="user" />} placeholder="请输入用户名..."/>
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator("password")(
                                    <Input.Password prefix={<Icon type="lock" />} placeholder="请输入密码" />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" onClick={this.handleSubmit}>登录</Button>
                        </Form.Item>
                    </Form>
                </Content>
        </div>);
    }
}

export default connect(stateToProps, stateToDispatch)(Form.create()(Login));
