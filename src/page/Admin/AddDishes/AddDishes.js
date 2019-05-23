import React, {Component} from 'react';
import './AddDishes.css';
import {
    Rate,
    Row,
    Col,
    Input,
    Tag,
    message,
    Upload,
    Icon,
    Button
} from 'antd';
import 'antd/lib/button/style/css';
import 'antd/lib/row/style/css';
import 'antd/lib/upload/style/css';
import axios from 'axios';
import {connect} from 'react-redux';
import {addDishes} from './../../../action/adminReducer.js';

const {CheckableTag} = Tag;
const stateToProps = state => ({
    dishesList: state.dishesList
});
const stateToDispatch = dispatch => {
    return {
        doAddDishes: (dish) => {
            dispatch(addDishes(dish));
        }
    };
};

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJPG) {
        message.error('仅支持JPG/JPEG/PNG格式的图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片必须小于2MB!');
    }
    return isJPG && isLt2M;
}

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

class AddDishes extends Component {
    constructor(props) {
        super(props);
        let saveDish = localStorage.getItem("dishContent");
        this.state = {
            loading: false,
            name: saveDish ? saveDish.name : "",
            introduction: saveDish ? saveDish.introduction : "",
            rate: saveDish ? saveDish.rate : 0,
            tag: saveDish ? saveDish.tag : "招牌菜",
            img: saveDish ? saveDish.img : ""
        };
    }
    clear = () => {
        this.refs.nameInput.state.value = "";
        this.refs.introInput.state.value = "";
        localStorage.removeItem("dishContent");
        this.setState({name: "", introduction: "", rate: 0, tag: "招牌菜", img: ""});
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            this.setState({img: info.file.response.data[0], loading: false});
        }
    };
    handleSave = () => {
        let data = {
            name: this.state.name,
            introduction: this.state.introduction,
            rate: this.state.rate,
            tag: this.state.tag,
            img: this.state.img
        };
        localStorage.setItem("dishContent", JSON.stringify(data));
        message.success("保存成功!");
    }
    handleSubmit = () => {
        let dish = {
            id: this.props.dishesList.length > 0 ? this.props.dishesList[this.props.dishesList.length - 1].id + 1 : 1,
            name: this.state.name,
            introduction: this.state.introduction,
            rate: this.state.rate,
            tag: this.state.tag,
            img: this.state.img
        };
        if (!checkInputLength("菜品名称", dish.name, 10, 1)) return ;
        if (!checkInputLength("菜品介绍", dish.introduction, 30)) return ;
        this.setState({loading: true});
        this.props.doAddDishes(dish);
        axios.get("http://localhost:9001/addDishes", {params: dish})
        .then(() => {
            message.success("发布成功!");
            this.clear();
            this.setState({loading: false});
        });
    }
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );
        const tags = [
            "招牌菜",
            "头盘冷菜",
            "私房美味",
            "家常风味",
            "煲煲共享",
            "田园时蔬",
            "美味靓汤",
            "精美点心",
            "饮料酒水"
        ];
        const state = this.state;
        return (
            <div>
                <Row gutter={16}>
                    <Col span={2}>
                        名称<span style={{color: 'red'}}>*</span>
                    </Col>
                    <Col span={8}>
                        <Input
                            onChange={(e) => this.setState({name: e.target.value})}
                            defaultValue={state.name}
                            ref="nameInput"
                        />
                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop: '16px'}}>
                    <Col span={2}>分类</Col>
                    <Col span={16}>
                        {
                            tags.map((item, key) => {
                                return (
                                    <CheckableTag
                                        key={`tag${key}`}
                                        checked={state.tag === item}
                                        onChange={() => this.setState({tag: item})}
                                    >
                                        {item}
                                    </CheckableTag>
                                );
                            })
                        }
                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop: '16px'}}>
                    <Col span={2}>介绍</Col>
                    <Col span={12}>
                        <Input
                            onChange={(e) => this.setState({introduction: e.target.value})}
                            defaultValue={state.introduction}
                            ref="introInput"
                        />
                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop: '16px'}}>
                    <Col span={2}>评分</Col>
                    <Col span={8}>
                        <Rate
                            allowHalf
                            onChange={(value) => this.setState({rate: value})}
                            defaultValue={state.rate}
                            ref="rateCounter"
                        />
                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop: '16px'}}>
                    <Col span={2}>菜品图片</Col>
                    <Col span={8}>
                        <Upload
                            name="dishesImg"
                            listType="picture-card"
                            className="dishImg-uploader"
                            showUploadList={false}
                            action="http://localhost:9001/uploadDishImg"
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                        >
                            {
                                this.state.img
                                    ? <img src={this.state.img} style={{width: '256px', height: '256px'}} alt=""/>
                                    : uploadButton
                            }
                        </Upload>
                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop: '16px'}}>
                    <Col span={2} offset={12}>
                        <Button type="primary" onClick={this.handleSubmit} loading={this.state.loading}>发布</Button>
                    </Col>
                    <Col span={2}>
                        <Button onClick={this.handleSave} loading={this.state.loading}>保存</Button>
                    </Col>
                    <Col span={2}>
                        <Button onClick={this.clear}>清空</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(stateToProps, stateToDispatch)(AddDishes);
