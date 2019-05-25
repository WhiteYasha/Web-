import React, {Component} from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {
    Row,
    Col,
    Input,
    DatePicker
} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'antd/lib/row/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/date-picker/style/css';
import E from 'wangeditor';

moment.locale('zh-cn');

const {RangePicker} = DatePicker;
const dateFormat = 'YYYY/MM/DD';

function disabledDate(current) {
    return current && current < moment().endOf('day');
}

class EditRecruit extends Component {
    editor;
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.defaultValue ? this.props.defaultValue.id : 0,
            name: this.props.defaultValue ? this.props.defaultValue.name : "",
            department: this.props.defaultValue ? this.props.defaultValue.department : "",
            position: this.props.defaultValue ? this.props.defaultValue.position : "",
            startDate: this.props.defaultValue ? this.props.defaultValue.startDate : null,
            endDate: this.props.defaultValue ? this.props.defaultValue.endDate : null,
            content: this.props.defaultValue ? this.props.defaultValue.content : ""
        };
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
        if (this.state.content !== "") {
            this.editor.txt.html(this.state.content);
        }
    }
}

export default EditRecruit;
