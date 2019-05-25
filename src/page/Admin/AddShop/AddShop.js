import React, {Component} from 'react';
import {Row, Col, Button, message} from 'antd';
import 'antd/lib/row/style/css';
import 'antd/lib/button/style/css';
import axios from 'axios';
import {addShop} from './../../../action/adminReducer.js';
import {connect} from 'react-redux';
import EditShop from './../../../component/Admin/EditShop/EditShop';

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
    } else {
        return "";
    }
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
        let saveShop = JSON.parse(localStorage.getItem("shopContent"));
        this.state = {
            loading: false,
            defaultShop: saveShop
        };
    }
    clear = () => {
        this.refs.shopContent.refs.nameInput.state.value = "";
        this.refs.shopContent.refs.prePhoneInput.state.value = "";
        this.refs.shopContent.refs.sufPhoneInput.state.value = "";
        this.refs.shopContent.refs.addressInput.state.value = "";
        localStorage.removeItem("shopContent");
        this.refs.shopContent.setState({
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
            name: this.refs.shopContent.state.name,
            phone: concatPhone(this.refs.shopContent.state.prePhone, this.refs.shopContent.state.sufPhone),
            address: this.refs.shopContent.state.address,
            cover: this.refs.shopContent.state.cover
        };
        if (!checkInputLength("店铺名称", shop.name, 30, 1)) return ;
        if (!checkInputLength("店铺地址", shop.address, 50, 1)) return ;
        if (!checkInputLength("订餐电话", shop.phone, 20, 1)) return ;
        if (!isNumber(this.refs.shopContent.state.prePhone) || !isNumber(this.refs.shopContent.state.sufPhone)) {
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
            name: this.refs.shopContent.state.name,
            phone: concatPhone(this.refs.shopContent.state.prePhone, this.refs.shopContent.state.sufPhone),
            address: this.refs.shopContent.state.address,
            cover: this.refs.shopContent.state.cover
        };
        localStorage.setItem("shopContent", JSON.stringify(shop));
        message.success("保存成功!");
    }
    render() {
        return (
            <div>
                <EditShop ref="shopContent" loading={this.state.loading} defaultValue={this.state.defaultShop} />
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
