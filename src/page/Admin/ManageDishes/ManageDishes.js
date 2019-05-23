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
import {deleteDishes} from './../../../action/adminReducer.js';

const stateToProps = state => ({dishesList: state.dishesList});
const stateToDispatch = dispatch => {
    return {
        doDeleteDishes: (id) => {
            dispatch(deleteDishes(id));
        }
    };
};

class ManageDishes extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: false};
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
                                <a><Icon type="edit"/>编辑</a>,
                                <a onClick={() => this.showDeleteModal(item.id)}><Icon type="delete"/>删除</a>
                            ]}
                        >
                            <Card.Meta
                                title={<div>{item.name}<Tag style={{marginLeft: '8px'}}>{item.tag}</Tag></div>}
                                description={item.introduction}
                                className="admin-dishcard"
                            />
                            <Rate disabled allowHalf defaultValue={item.rate} />
                        </Card>
                    </List.Item>
                )}
            />
        </div>)
    }
}

export default connect(stateToProps, stateToDispatch)(ManageDishes);
