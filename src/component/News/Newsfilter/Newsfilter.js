import React, {Component} from 'react';
import {Form, Button, Select} from 'antd';
import 'antd/lib/button/style/css';
import 'antd/lib/form/style/css';
import 'antd/lib/select/style/css';

const Option = Select.Option;

class Newsfilter extends Component {
    render() {
        const {getFieldDecorator} = this.props.form;
        return (<div className="news-content-filters">
            <header>新闻中心</header>
            <Form layout="inline">
                <Form.Item label={<span>筛选</span>}>
                    {
                        getFieldDecorator('filter', {
                            initialValue: "all"
                        })(
                            <Select style={{
                                    minWidth: '100px'
                                }}>
                                <Option value="all">全部</Option>
                                <Option value="company">公司新闻</Option>
                                <Option value="industry">行业新闻</Option>
                                <Option value="media">媒体新闻</Option>
                                <Option value="employee">员工天地</Option>
                                <Option value="hornor">荣誉资质</Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item style={{display: 'inline-block'}} label="排序：">
                    {
                        getFieldDecorator('order', {
                            initialValue: "newest"
                        })(
                            <Select style={{
                                    minWidth: '100px'
                                }}>
                                <Option value="newest">最新</Option>
                                <Option value="viewmost">最多浏览</Option>
                                <Option value="likemost">最多点赞</Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item style={{float: 'right'}}>
                    <Button type="primary" htmlType="submit">搜索</Button>
                </Form.Item>
            </Form>
        </div>)
    }
}

export default Form.create()(Newsfilter);
