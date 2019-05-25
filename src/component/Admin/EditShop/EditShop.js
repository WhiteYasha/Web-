import React, {Component} from 'react';
import './EditShop.css';
import {
    Input,
    Upload,
    Icon,
    message,
    Row,
    Col,
    Tooltip
} from 'antd';
import 'antd/lib/row/style/css';

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

class EditShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: this.props.loading ? this.props.loading : false,
            id: this.props.defaultValue ? this.props.defaultValue.id : 0,
            name: this.props.defaultValue ? this.props.defaultValue.name : "",
            prePhone: this.props.defaultValue ? splitPhone(this.props.defaultValue.phone)[0] : "",
            sufPhone: this.props.defaultValue ? splitPhone(this.props.defaultValue.phone)[1] : "",
            address: this.props.defaultValue ? this.props.defaultValue.address : "",
            cover: this.props.defaultValue && this.props.defaultValue.cover ? this.props.defaultValue.cover : null
        };
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
            </div>);
    }
}

export default EditShop;
