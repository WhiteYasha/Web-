import React, {Component} from 'react';
import {
    Layout,
    Rate,
    Row,
    Col,
    Input,
    Tag
} from 'antd';
import 'antd/lib/rate/style/css';
import 'antd/lib/tag/style/css';
import 'antd/lib/row/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/layout/style/css';

const {Content} = Layout;
const {CheckableTag} = Tag;

class AddDishes extends Component {
    constructor(props) {
        super(props);
        let saveDish = localStorage.getItem("dishContent");
        this.state = {
            name: saveDish
                ? saveDish.name
                : "",
            introduction: saveDish
                ? saveDish.introduction
                : "",
            rate: saveDish
                ? saveDish.rate
                : 0,
            tag: saveDish
                ? saveDish.tag
                : "招牌菜",
            img: saveDish
                ? saveDish.img
                : null
        };
    }
    render() {
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
            <div style={{background: '#fff', border: '1px solid #ccc', height: '100vh', padding: '5%'}}>

                <Row gutter={16}>
                    <Col span={2}>名称</Col>
                    <Col span={8}>
                        <Input/>
                    </Col>
                </Row>
                <Row gutter={16} style={{
                        marginTop: '16px'
                    }}>
                    <Col span={2}>分类</Col>
                    <Col span={16}>
                        {
                            tags.map((item) => {
                                return <CheckableTag checked={state.tag === item} onChange={() => this.setState({tag: item})}>{item}</CheckableTag>;
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
                            }}/>
                    </Col>
                </Row>
                <Row gutter={16} style={{
                        marginTop: '16px'
                    }}>
                    <Col span={2}>评分</Col>
                    <Col span={8}>
                        <Rate allowHalf="allowHalf"/>
                    </Col>
                </Row>
            </div>
        </Content>);
    }
}

export default AddDishes;
