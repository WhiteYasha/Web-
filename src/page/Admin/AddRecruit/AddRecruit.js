import React, {Component} from 'react';
import {
    Row,
    Col,
    Button,
    message
} from 'antd';
import 'antd/lib/row/style/css';
import 'antd/lib/button/style/css';
import {connect} from 'react-redux';
import axios from 'axios';
import {addRecruit} from './../../../action/adminReducer.js';
import EditRecruit from './../../../component/Admin/EditRecruit/EditRecruit';

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

function checkInputLength(name, text, max, min = 0) {
    if (text.length > max) {
        message.error(`${name}最大长度不能超过${max}个字!`);
        return false;
    }
    if (text.length < min) {
        message.error(`${name}最小长度不能少于${min}个字!`);
        return false;
    }
    return true;
}

class AddRecruit extends Component {
    constructor(props) {
        super(props);
        let saveRecruit = JSON.parse(localStorage.getItem("recruitContent"));
        this.state = {
            loading: false,
            defaultRecruit: saveRecruit
        };
    }
    clear() {
        this.refs.recruitContent.refs.nameInput.state.value = "";
        this.refs.recruitContent.refs.departmentInput.state.value = "";
        this.refs.recruitContent.refs.positionInput.state.value = "";
        this.refs.recruitContent.editor.txt.clear();
        localStorage.removeItem("recruitContent");
        this.refs.recruitContent.setState({name: "", department: "", position: "", startDate: null, endDate: null, content: ""});
    }
    handleSave = () => {
        let recruitInfo = {
            name: this.refs.recruitContent.state.name,
            department: this.refs.recruitContent.state.department,
            position: this.refs.recruitContent.state.position,
            startDate: this.refs.recruitContent.state.startDate,
            endDate: this.refs.recruitContent.state.endDate,
            content: this.refs.recruitContent.state.content
        };
        localStorage.setItem("recruitContent", JSON.stringify(recruitInfo));
        message.success("保存成功!");
    }
    handleSubmit = () => {
        let recruitInfo = {
            id: this.props.recruitList.length > 0 ? this.props.recruitList[this.props.recruitList.length - 1].id + 1 : 1,
            name: this.refs.recruitContent.state.name,
            department: this.refs.recruitContent.state.department,
            position: this.refs.recruitContent.state.position,
            startDate: this.refs.recruitContent.state.startDate,
            endDate: this.refs.recruitContent.state.endDate,
            content: this.refs.recruitContent.state.content
        };
        if (!checkInputLength("职位名称", recruitInfo.name, 30, 1)) return ;
        if (!checkInputLength("工作部门", recruitInfo.department, 20, 1)) return ;
        if (!checkInputLength("工作地点", recruitInfo.position, 20)) return ;
        this.setState({loading: true});
        this.props.doAddRecruit(recruitInfo);
        axios.get("http://localhost:9001/addRecruit", {params: recruitInfo})
        .then(() => {
            message.success("发布成功!");
            this.clear();
            this.setState({loading: false});
        });
    }
    render() {
        return (
            <div>
                <EditRecruit
                    ref="recruitContent"
                    defaultValue={this.state.defaultRecruit}
                />
                <Row gutter={16} style={{marginTop: '16px'}}>
                    <Col span={2} offset={18}>
                        <Button type="primary" loading={this.state.loading} onClick={this.handleSubmit}>发布</Button>
                    </Col>
                    <Col span={2}>
                        <Button loading={this.state.loading} onClick={this.handleSave}>保存</Button>
                    </Col>
                    <Col span={2}>
                        <Button onClick={this.clear}>清空</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(stateToProps, stateToDispatch)(AddRecruit);
