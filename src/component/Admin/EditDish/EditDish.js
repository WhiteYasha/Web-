import React, {Component} from 'react';
import './EditDish.css';
import {
    Rate,
    Row,
    Col,
    Input,
    Tag,
    message,
    Upload,
    Icon
} from 'antd';
import 'antd/lib/button/style/css';
import 'antd/lib/row/style/css';
import 'antd/lib/upload/style/css';

const {CheckableTag} = Tag;

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

class EditDish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: this.props.loading ? this.props.loading :false,
            id: this.props.defaultValue ? this.props.defaultValue.id : 0,
            name: this.props.defaultValue ? this.props.defaultValue.name : "",
            introduction: this.props.defaultValue ? this.props.defaultValue.introduction : "",
            rate: this.props.defaultValue ? this.props.defaultValue.rate : 0,
            tag: this.props.defaultValue ? this.props.defaultValue.tag : "招牌菜",
            img: this.props.defaultValue && this.props.defaultValue.img ? this.props.defaultValue.img : null
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
        return (
            <div>
                <Row gutter={16}>
                    <Col span={2}>
                        名称<span style={{color: 'red'}}>*</span>
                    </Col>
                    <Col span={8}>
                        <Input
                            onChange={(e) => this.setState({name: e.target.value})}
                            defaultValue={this.state.name}
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
                                        checked={this.state.tag === item}
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
                            defaultValue={this.state.introduction}
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
                            defaultValue={this.state.rate}
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
            </div>
        );
    }
}

export default EditDish;
