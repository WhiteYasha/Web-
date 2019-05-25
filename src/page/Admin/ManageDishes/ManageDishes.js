import React, {Component} from 'react';
import './ManageDishes.css';
import {
    List,
    Card,
    Modal,
    message,
    Icon,
    Rate,
    Tag
} from 'antd';
import {connect} from 'react-redux';
import axios from 'axios';
import {deleteDishes, updateDishes} from './../../../action/adminReducer.js';
import EditDish from './../../../component/Admin/EditDish/EditDish';

const stateToProps = state => ({dishesList: state.dishesList});
const stateToDispatch = dispatch => {
    return {
        doDeleteDishes: (id) => {
            dispatch(deleteDishes(id));
        },
        doUpdateDIshes: (dish) => {
            dispatch(updateDishes(dish));
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

class ManageDishes extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: false, visible: false, selectDish: null};
    }
    showDeleteModal = (id) => {
        const self = this;
        Modal.confirm({
            title: "删除菜品",
            content: "确定要删除这道菜品吗?",
            okText: "确定",
            okType: "danger",
            cancelText: "取消",
            onOk() {
                self.setState({loading: true});
                self.props.doDeleteDishes(id);
                axios.get("http://localhost:9001/deleteDishes", {params: {id: id}})
                .then(() => {
                    message.success("删除成功!");
                    self.setState({loading: false});
                });
            }
        })
    }
    handleEdit = (dish) => {
        this.setState({visible: true, selectDish: dish});
    }
    handleUpdate = (e) => {
        let dish = {
            id: this.refs.dishContent.state.id,
            name: this.refs.dishContent.state.name,
            introduction: this.refs.dishContent.state.introduction,
            rate: this.refs.dishContent.state.rate,
            tag: this.refs.dishContent.state.tag,
            img: this.refs.dishContent.state.img
        };
        if (!checkInputLength("菜品名称", dish.name, 10, 1)) return ;
        if (!checkInputLength("菜品介绍", dish.introduction, 30)) return ;
        this.setState({loading: true});
        this.props.doUpdateDIshes(dish);
        axios.get("http://localhost:9001/updateDishes", {params: dish})
        .then(() => {
            message.success("修改成功!");
            this.setState({visible: false, loading: false, selectDish: null});
        });
    }
    render() {
        return (
            <div>
            <List
                loading={this.state.loading}
                grid={{gutter: 16, column: 4}}
                dataSource={this.props.dishesList}
                pagination={{pageSize: 12}}
                renderItem={item => (
                    <List.Item>
                        <Card
                            hoverable
                            cover={<img src={item.img} alt="" />}
                            actions={[
                                <a onClick={() => this.handleEdit(item)}><Icon type="edit"/>编辑</a>,
                                <a onClick={() => this.showDeleteModal(item.id)}><Icon type="delete"/>删除</a>
                            ]}
                        >
                            <Card.Meta
                                title={<div>{item.name}<Tag style={{marginLeft: '8px'}}>{item.tag}</Tag></div>}
                                description={item.introduction}
                                className="admin-dishcard"
                            />
                            <Rate disabled allowHalf value={item.rate} />
                        </Card>
                    </List.Item>
                )}
            />
            <Modal
                title="编辑菜品"
                visible={this.state.visible}
                okText="确认修改"
                cancelText="取消"
                onOk={this.handleUpdate}
                onCancel={() => this.setState({visible: false})}
                width={1024}
                destroyOnClose
            >
                <EditDish
                    ref="dishContent"
                    defaultValue={this.state.selectDish}
                    loading={this.state.loading}
                />
            </Modal>
        </div>)
    }
}

export default connect(stateToProps, stateToDispatch)(ManageDishes);
