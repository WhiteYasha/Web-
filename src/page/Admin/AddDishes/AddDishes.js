import React, {Component} from 'react';
import './AddDishes.css';
import {
    Layout,
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
import 'antd/lib/message/style/css';
import 'antd/lib/rate/style/css';
import 'antd/lib/upload/style/css';
import 'antd/lib/tag/style/css';
import 'antd/lib/row/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/layout/style/css';
import axios from 'axios';
import {connect} from 'react-redux';
import {addDishes} from './../../../action/adminReducer.js';

const {Content} = Layout;
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

class AddDishes extends Component {
    constructor(props) {
        super(props);
        let saveDish = localStorage.getItem("dishContent");
        this.state = {
            loading: false,
            name: saveDish
                ? JSON.parse(localStorage.getItem("dishContent")).name
                : "",
            introduction: saveDish
                ? JSON.parse(localStorage.getItem("dishContent")).introduction
                : "",
            rate: saveDish
                ? JSON.parse(localStorage.getItem("dishContent")).rate
                : 0,
            tag: saveDish
                ? JSON.parse(localStorage.getItem("dishContent")).tag
                : "招牌菜",
            img: saveDish
                ? JSON.parse(localStorage.getItem("dishContent")).img
                : ""
        };
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
        if (dish.name === "") {
            message.error("请输入名称!");
            return ;
        }
        this.setState({loading: true});
        this.props.doAddDishes(dish);
        axios.get("http://localhost:9001/addDishes", {params: dish})
        .then(() => {
            localStorage.removeItem("dishContent");
            message.success("发布成功!");
            this.setState({loading: false, name: "", introduction: "", rate: 0, tag: "招牌菜", img: ""});
        });
    }
    render() {
        const uploadButton = (<div>
            <Icon type={this.state.loading
                    ? 'loading'
                    : 'plus'}/>
            <div className="ant-upload-text">Upload</div>
        </div>);
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
                    <Col span={2}>名称<span style={{color: 'red'}}>*</span></Col>
                    <Col span={8}>
                        <Input onChange={(e) => this.setState({name: e.target.value})} defaultValue={state.name} />
                    </Col>
                </Row>
                <Row gutter={16} style={{
                        marginTop: '16px'
                    }}>
                    <Col span={2}>分类</Col>
                    <Col span={16}>
                        {
                            tags.map((item, key) => {
                                return <CheckableTag key={`tag${key}`} checked={state.tag === item} onChange={() => this.setState({tag: item})}>{item}</CheckableTag>;
                            })
                        }
                    </Col>
                </Row>
                <Row gutter={16} style={{
                        marginTop: '16px'
                    }}>
                    <Col span={2}>介绍</Col>
                    <Col span={10}>
                        <Input.TextArea autosize={{
                                minRows: 4,
                                maxRows: 4
                            }} onChange={(e) => this.setState({introduction: e.target.value})} defaultValue={state.introduction}/>
                    </Col>
                </Row>
                <Row gutter={16} style={{
                        marginTop: '16px'
                    }}>
                    <Col span={2}>评分</Col>
                    <Col span={8}>
                        <Rate allowHalf onChange={(value) => this.setState({rate: value})} defaultValue={state.rate}/>
                    </Col>
                </Row>
                <Row gutter={16} style={{
                        marginTop: '16px'
                    }}>
                    <Col span={2}>菜品图片</Col>
                    <Col span={8}>
                        <Upload name="dishesImg" listType="picture-card" className="dishImg-uploader" showUploadList={false} action="http://localhost:9001/uploadDishImg" beforeUpload={beforeUpload} onChange={this.handleChange}>
                            {
                                this.state.img
                                    ? <img src={this.state.img} style={{
                                                width: '256px',
                                                height: '256px'
                                            }} alt=""/>
                                    : uploadButton
                            }
                        </Upload>
                    </Col>
                </Row>
                <Row gutter={16} style={{
                        marginTop: '16px'
                    }}>
                    <Col span={2} offset={12}>
                        <Button type="primary" onClick={this.handleSubmit} loading={this.state.loading}>发布</Button>
                    </Col>
                    <Col span={2}>
                        <Button onClick={this.handleSave} loading={this.state.loading}>保存</Button>
                    </Col>
                </Row>
            </div>
        </Content>);
    }
}

export default connect(stateToProps, stateToDispatch)(AddDishes);
