import React, {Component} from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {
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
import axios from 'axios';
import {addRecruit} from './../../../action/adminReducer.js';

const {RangePicker} = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const stateToProps = state => ({
    recruitList: state.recruitList
});
const stateToDispatch = dispatch => {
    return {
        doAddRecruit: (recruit) => {
            dispatch(addRecruit(recruit));
        }
    };
};

function disabledDate(current) {
    return current && current < moment().endOf('day');
}

moment.locale('zh-cn');
class AddRecruit extends Component {
    editor;
    constructor(props) {
        super(props);
        let saveRecruit = JSON.parse(localStorage.getItem("recruitContent"));
        this.state = {
            loading: false,
            name: saveRecruit ? saveRecruit.name : "",
            department: saveRecruit ? saveRecruit.department : "",
            position: saveRecruit ? saveRecruit.position : "",
            startDate: saveRecruit ? saveRecruit.startDate : null,
            endDate: saveRecruit ? saveRecruit.endDate : null,
            content: saveRecruit ? saveRecruit.content : ""
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
        if (recruitInfo.name === "" || recruitInfo.department === "") {
            message.error("请填写完整信息!");
            return ;
        }
        this.setState({loading: true});
        this.props.doAddRecruit(recruitInfo);
        axios.get("http://localhost:9001/addRecruit", {params: recruitInfo})
        .then(() => {
            localStorage.removeItem("recruitContent");
            message.success("发布成功!");
            this.refs.nameInput.state.value = "";
            this.refs.departmentInput.state.value = "";
            this.refs.positionInput.state.value = "";
            this.editor.txt.clear();
            this.setState({loading: false, name: "", department: "", position: "", startDate: null, endDate: null, content: ""});
        });
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <Col span={2}>
                        职位名称<span style={{color: 'red'}}>*</span>
                    </Col>
                    <Col span={8}>
                        <Input
                            defaultValue={this.state.name}
                            onChange={(e) => this.setState({name: e.target.value})}
                            ref="nameInput"
                        />
                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop: '16px'}}>
                    <Col span={2}>发布时间</Col>
                    <Col span={10}>
                        <RangePicker
                            locale={locale}
                            disabledDate={disabledDate}
                            defaultValue={[
                                this.state.startDate ? moment(this.state.startDate, dateFormat) : null,
                                this.state.endDate ? moment(this.state.endDate, dateFormat) : null
                            ]}
                            onChange={(date, dateString) => this.setState({startDate: dateString[0], endDate: dateString[1]})}
                            ref="datePicker"
                        />
                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop: '16px'}}>
                    <Col span={2}>
                        部门<span style={{color: 'red'}}>*</span>
                    </Col>
                    <Col span={10}>
                        <Input
                            defaultValue={this.state.department}
                            onChange={(e) => this.setState({department: e.target.value})}
                            ref="departmentInput"
                        />
                    </Col>
                    <Col span={2} offset={2}>工作地点</Col>
                    <Col span={8}>
                        <Input
                            defaultValue={this.state.position}
                            onChange={(e) => this.setState({position: e.target.value})}
                            ref="positionInput"
                        />
                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop: '16px'}}>
                    <Col span={2}>内容</Col>
                    <Col span={22}>
                        <div
                            id="editArea"
                            ref="editorElem"
                            style={{textAlign: 'left', background: '#fff'}}
                        />
                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop: '16px'}}>
                    <Col span={2} offset={20}>
                        <Button type="primary" loading={this.state.loading} onClick={this.handleSubmit}>发布</Button>
                    </Col>
                    <Col span={2}>
                        <Button loading={this.state.loading} onClick={this.handleSave}>保存</Button>
                    </Col>
                </Row>
            </div>
        );
    }
    componentDidMount() {
        const elem = this.refs.editorElem;
        this.editor = new E(elem);
        this.editor.customConfig.onchange = html => {
            this.setState({content: html});
        };
        this.editor.customConfig.zIndex = 100;
        this.editor.create();
        if (JSON.parse(localStorage.getItem("recruitContent")) !== null) {
            this.editor.txt.html(JSON.parse(localStorage.getItem("recruitContent")).content);
        }
    }
}

export default connect(stateToProps, stateToDispatch)(AddRecruit);
