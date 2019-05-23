import React, {Component} from 'react';
import './AddShop.css';
import {
    Input,
    Upload,
    Button,
    Icon,
    message,
    Row,
    Col,
    Tooltip
} from 'antd';
import 'antd/lib/row/style/css';
import 'antd/lib/button/style/css';
import axios from 'axios';
import {addShop} from './../../../action/adminReducer.js';
import {connect} from 'react-redux';

const stateToProps = state => ({shopList: state.shopList});
const stateToDispatch = dispatch => {
    return {
        doAddShop: (shop) => {
            dispatch(addShop(shop));
        }
    };
};

function concatPhone(pre, suf) {
    if (pre !== "" && suf !== "") {
        return pre + "-" + suf;
    } else if (pre) {
        return pre;
    } else if (suf) {
        return "-" + suf;
    } else
        return "";
    }
function splitPhone(phone) {
    return phone.split("-");
}
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
function isNumber(value) {
    var patrn = /^[0-9]*$/;
    if (patrn.exec(value) == null) {
        return false;
    } else {
        return true;
    }
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

class AddShop extends Component {
    constructor(props) {
        super(props);
        let saveShop = localStorage.getItem("shopContent");
        this.state = {
            loading: false,
            name: saveShop ? saveShop.name : "",
            prePhone: saveShop ? splitPhone(saveShop.phone)[0] : "",
            sufPhone: saveShop ? splitPhone(saveShop.phone)[1] : "",
            address: saveShop ? saveShop.address : "",
            cover: saveShop ? saveShop.cover : ""
        };
    }
    clear = () => {
        this.refs.nameInput.state.value = "";
        this.refs.prePhoneInput.state.value = "";
        this.refs.sufPhoneInput.state.value = "";
        this.refs.addressInput.state.value = "";
        localStorage.removeItem("shopContent");
        this.setState({
            name: "",
            prePhone: "",
            sufPhone: "",
            address: "",
            cover: ""
        });
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            this.setState({cover: info.file.response.data[0], loading: false});
        }
    }
    handleSubmit = (e) => {
        let shop = {
            id: this.props.shopList.length > 0 ? this.props.shopList[this.props.shopList.length - 1].id + 1 : 1,
            name: this.state.name,
            phone: concatPhone(this.state.prePhone, this.state.sufPhone),
            address: this.state.address,
            cover: this.state.cover
        };
        if (!checkInputLength("店铺名称", shop.name, 30, 1)) return ;
        if (!checkInputLength("店铺地址", shop.address, 50, 1)) return ;
        if (!checkInputLength("订餐电话", shop.phone, 20, 1)) return ;
        if (!isNumber(this.state.prePhone) || !isNumber(this.state.sufPhone)) {
            message.info("电话号码只能输入数字!");
            return;
        }
        this.setState({loading: true});
        this.props.doAddShop(shop);
        axios.get("http://localhost:9001/addShop", {params: shop}).then(() => {
            message.success("发布成功!");
            this.clear();
            this.setState({loading: false});
        });
    }
    handleSave = (e) => {
        let shop = {
            name: this.state.name,
            phone: concatPhone(this.state.prePhone, this.state.sufPhone),
            address: this.state.address,
            cover: this.state.cover
        };
        localStorage.setItem("shopContent", JSON.stringify(shop));
        message.success("保存成功!");
    }
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                <div className="ant-upload-text">上传图片</div>
            </div>
        );
        return (
            <div>
                <Row gutter={16}>
                    <Col span={2}>
                        店名<span style={{color: 'red'}}>*</span>
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
                    <Col span={2}>电话</Col>
                    <Col span={8}>
                        <Input.Group compact>
                            <Input
                                style={{width: '40%'}}
                                defaultValue={this.state.prePhone}
                                suffix={<Tooltip title="请填写电话号码区号"><Icon type="info-circle" style={{color: 'rgba(0,0,0,.45)'}}/></Tooltip>}
                                onChange={(e) => this.setState({prePhone: e.target.value})}
                                ref="prePhoneInput"
                            />
                            <Input
                                style={{width: '60%'}}
                                defaultValue={this.state.sufPhone}
                                onChange={(e) => this.setState({sufPhone: e.target.value})}
                                ref="sufPhoneInput"
                            />
                        </Input.Group>
                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop: '16px'}}>
                    <Col span={2}>
                        地址<span style={{color: 'red'}}>*</span>
                    </Col>
                    <Col span={10}>
                        <Input
                            defaultValue={this.state.address}
                            onChange={(e) => this.setState({address: e.target.value})}
                            ref="addressInput"
                        />
                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop: '16px'}}>
                    <Col span={2}>图片</Col>
                    <Col span={8}>
                        <Upload
                            name="shopImg"
                            listType="picture-card"
                            className="shopImg-uploader"
                            showUploadList={false}
                            action="http://localhost:9001/uploadShopImg"
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                        >
                            {
                                this.state.cover
                                    ? <img src={this.state.cover} style={{width: '384px', height: '256px'}} alt=""/>
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
            </div>);
    }
}

export default connect(stateToProps, stateToDispatch)(AddShop);
