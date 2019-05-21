import React, {Component} from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {
    Layout,
    Row,
    Col,
    Input,
    DatePicker,
    Button,
    message
} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'antd/lib/row/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/date-picker/style/css';
import E from 'wangeditor';
import {connect} from 'react-redux';

const {Content} = Layout;
const {RangePicker} = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const stateToProps = state => ({
    recruitList: state.recruitList
});

function disabledDate(current) {
    return current && current < moment().endOf('day');
}

moment.locale('zh-cn');
class AddRecruit extends Component {
    constructor(props) {
        super(props);
        let saveRecruit = JSON.parse(localStorage.getItem("recruitContent")) !== null;
        this.state = {
            loading: false,
            name: saveRecruit
                ? JSON.parse(localStorage.getItem("recruitContent")).name
                : "",
            department: saveRecruit
                ? JSON.parse(localStorage.getItem("recruitContent")).department
                : "",
            position: saveRecruit
                ? JSON.parse(localStorage.getItem("recruitContent")).position
                : "",
            startDate: saveRecruit
                ? JSON.parse(localStorage.getItem("recruitContent")).startDate
                : null,
            endDate: saveRecruit
                ? JSON.parse(localStorage.getItem("recruitContent")).endDate
                : null,
            content: saveRecruit
                ? JSON.parse(localStorage.getItem("recruitContent")).content
                : ""
        };
    }
    handleSave = () => {
        let recruitInfo = {
            name: this.state.name,
            department: this.state.department,
            position: this.state.position,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            content: this.state.content
        };
        localStorage.setItem("recruitContent", JSON.stringify(recruitInfo));
        message.success("保存成功!");
    }
    handleSubmit = () => {
        let recruitInfo = {
            id: this.props.recruitList.length > 0 ? this.props.recruitList[this.props.recruitList.length - 1].id + 1 : 1,
            name: this.state.name,
            department: this.state.department,
            position: this.state.position,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            content: this.state.content
        };
    }
    render() {
        return (<Content style={{
                padding: '16px calc(100% / 24)'
            }}>
            <div style={{
                    background: '#fff',
                    border: '1px solid #ccc',
                    height: 'auto',
                    padding: '5%'
                }}>
                <Row gutter={16}>
                    <Col span={2}>
                        职位名称<span style={{
                color: 'red'
            }}>*</span>
                    </Col>
                    <Col span={8}>
                        <Input defaultValue={this.state.name}/>
                    </Col>
                </Row>
                <Row gutter={16} style={{
                        marginTop: '16px'
                    }}>
                    <Col span={2}>
                        部门<span style={{
                color: 'red'
            }}>*</span>
                    </Col>
                    <Col span={8}>
                        <Input defaultValue={this.state.department}/>
                    </Col>
                </Row>
                <Row gutter={16} style={{
                        marginTop: '16px'
                    }}>
                    <Col span={2}>发布时间</Col>
                    <Col span={10}>
                        <RangePicker size="default" locale={locale} disabledDate={disabledDate} defaultValue={[
                                this.state.startDate
                                    ? moment(this.state.startDate, dateFormat)
                                    : null,
                                this.state.endDate
                                    ? moment(this.state.endDate, dateFormat)
                                    : null
                            ]} onChange={(date, dateString) => this.setState({startDate: dateString[0], endDate: dateString[1]})}/>
                    </Col>
                </Row>
                <Row gutter={16} style={{
                        marginTop: '16px'
                    }}>
                    <Col span={2}>内容</Col>
                    <Col span={22}>
                        <div id="editArea" ref="editorElem" style={{
                                textAlign: 'left',
                                background: '#fff'
                            }}/>
                    </Col>
                </Row>
                <Row gutter={16} style={{
                        marginTop: '16px'
                    }}>
                    <Col span={2} offset={20}>
                        <Button type="primary" loading={this.state.loading}>发布</Button>
                    </Col>
                    <Col span={2}>
                        <Button loading={this.state.loading} onClick={this.handleSave}>保存</Button>
                    </Col>
                </Row>
            </div>
        </Content>);
    }
    componentDidMount() {
        const elem = this.refs.editorElem;
        var editor = new E(elem);
        editor.customConfig.onchange = html => {
            this.setState({content: html});
        };
        editor.customConfig.zIndex = 100;
        editor.create();
        if (JSON.parse(localStorage.getItem("recruitContent")) !== null) {
            editor.txt.html(JSON.parse(localStorage.getItem("recruitContent")).content);
        }
    }
}

export default connect(stateToProps)(AddRecruit);
