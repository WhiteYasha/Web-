import React, {Component} from 'react';
import './Newsfilter.css';
import {Form, Button, Select} from 'antd';
import 'antd/lib/button/style/css';
import 'antd/lib/form/style/css';
import 'antd/lib/select/style/css';
import {connect} from 'react-redux';
import {changeNewsState, filterNews} from './../../../action/reducer.js';

const Option = Select.Option;
const stateToProps = state => ({});
const stateToDispatch = dispatch => {
    return {
        doChangenewsState: (newsState) => {
            dispatch(changeNewsState(newsState));
        },
        doFilterNews: (filterType, sortType) => {
            dispatch(filterNews(filterType, sortType));
        }
    };
};

class Newsfilter extends Component {
    handleSubmit = (e) => {
        this.props.doChangenewsState(false);
        // eslint-disable-next-line {/*处理筛选类型和排序方式*/}
        let filterType = this.props.form.getFieldValue("filter"),
            sortType = this.props.form.getFieldValue("order");
        if (filterType === "company") filterType = "公司新闻";
        else if (filterType === "industry") filterType = "行业新闻";
        else if (filterType === "media") filterType = "媒体新闻";
        else if (filterType === "employee") filterType = "员工天地";
        this.props.doFilterNews(filterType, sortType);
    }
    componentWillMount() {
        this.props.doFilterNews("all", "newest");
    }
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
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item style={{float: 'right'}}>
                    <Button htmlType="submit" onClick={this.handleSubmit}>搜索</Button>
                </Form.Item>
            </Form>
        </div>)
    }
}

export default Form.create()(connect(stateToProps, stateToDispatch)(Newsfilter));
