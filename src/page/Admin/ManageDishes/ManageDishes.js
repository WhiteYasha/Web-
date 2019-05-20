import React, {Component} from 'react';
import {Layout, List, Card, Modal, message} from 'antd';
import 'antd/lib/layout/style/css';
import 'antd/lib/message/style/css';
import 'antd/lib/list/style/css';
import 'antd/lib/modal/style/css';
import 'antd/lib/card/style/css';
import {connect} from 'react-redux';
import axios from 'axios';
import {deleteDishes} from './../../../action/adminReducer.js';

const {Content} = Layout;
const stateToProps = state => ({
    dishesList: state.dishesList
});
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
        this.state = {visible: false, deleteID: -1};
    }
    handleDelete = (e) => {
        this.props.doDeleteDishes(this.state.deleteID);
        axios.get("http://localhost:9001/deleteDishes", {params: {id: this.state.deleteID}})
        .then(() => {
            message.success("删除成功!");
            this.setState({visible: false, deleteID: -1});
        });
    }
    render() {
        return (
            <Content style={{
                    padding: '16px calc(100% / 24)'
                }}>
                <div style={{
                        background: '#fff',
                        border: '1px solid #ccc',
                        height: 'auto',
                        padding: '5%'
                    }}>
                    <List
                        grid={{gutter: 16, column: 4}}
                        dataSource={this.props.dishesList}
                        pagination={{pageSize: 12}}
                        renderItem={item => (
                            <List.Item>
                                <Card hoverable cover={<img src={item.img} alt=""/>} extra={
                                    <span><a>编辑</a>&nbsp;&nbsp;<a onClick={() => this.setState({visible: true, deleteID: item.id})}>删除</a></span>
                                }>
                                    <Card.Meta title={item.name} description={item.introduction} />
                                </Card>
                            </List.Item>
                        )}
                    />
                    <Modal
                        visible={this.state.visible}
                        title="删除菜品"
                        onCancel={() => this.setState({visible: false})}
                        onOk={this.handleDelete}
                    >
                        <p>确定要删除吗?</p>
                    </Modal>
                </div>
            </Content>
        )
    }
}

export default connect(stateToProps, stateToDispatch)(ManageDishes);
