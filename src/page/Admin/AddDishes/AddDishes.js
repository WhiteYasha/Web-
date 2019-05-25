import React, {Component} from 'react';
import {
    Row,
    Col,
    message,
    Button
} from 'antd';
import 'antd/lib/button/style/css';
import 'antd/lib/row/style/css';
import EditDish from './../../../component/Admin/EditDish/EditDish';
import axios from 'axios';
import {connect} from 'react-redux';
import {addDishes} from './../../../action/adminReducer.js';

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
        let saveDish = JSON.parse(localStorage.getItem("dishContent"));
        this.state = {
            loading: false,
            defaultDish: saveDish
        };
    }
    clear = () => {
        this.refs.dishContent.refs.nameInput.state.value = "";
        this.refs.dishContent.refs.introInput.state.value = "";
        localStorage.removeItem("dishContent");
        this.refs.dishContent.setState({name: "", introduction: "", rate: 0, tag: "招牌菜", img: ""});
    }
    handleSave = () => {
        let data = {
            name: this.refs.dishContent.state.name,
            introduction: this.refs.dishContent.state.introduction,
            rate: this.refs.dishContent.state.rate,
            tag: this.refs.dishContent.state.tag,
            img: this.refs.dishContent.state.img
        };
        localStorage.setItem("dishContent", JSON.stringify(data));
        message.success("保存成功!");
    }
    handleSubmit = () => {
        let dish = {
            id: this.props.dishesList.length > 0 ? this.props.dishesList[this.props.dishesList.length - 1].id + 1 : 1,
            name: this.refs.dishContent.state.name,
            introduction: this.refs.dishContent.state.introduction,
            rate: this.refs.dishContent.state.rate,
            tag: this.refs.dishContent.state.tag,
            img: this.refs.dishContent.state.img
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
        return (
            <div>
                <EditDish
                    ref="dishContent"
                    defaultValue={this.state.defaultDish}
                    loading={this.state.loading}
                    changeTag={(item) => this.setState({defaultDish: Object.assign({}, this.state.defaultDish, {tag: item})})}
                />
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
