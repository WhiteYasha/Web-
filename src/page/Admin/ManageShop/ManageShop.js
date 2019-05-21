import React, {Component} from 'react';
import {Layout, List, Icon, Modal, message} from 'antd';
import {connect} from 'react-redux';
import axios from 'axios';
import {deleteShop} from './../../../action/adminReducer.js';

const {Content} = Layout;
const confirm = Modal.confirm;
const stateToProps = state => ({shopList: state.shopList});
const stateToDispatch = dispatch => {
    return {
        doDeleteShop: (id) => {
            dispatch(deleteShop(id));
        }
    };
};

class ManageShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }
    showDeleteConfirm = (item) => {
        let self = this;
        confirm({
            title: '删除店面',
            content: '你确定要删除这个店面吗?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                self.setState({loading: true});
                self.props.doDeleteShop(item.id);
                axios.get("http://localhost:9001/deleteShop", {params: {id: item.id}})
                .then(() => {
                    message.success("删除成功!");
                    self.setState({loading: false});
                });
            }
        });
    }
    render() {
        return (<Content style={{
                padding: '16px calc(100% / 24)'
            }}>
            <div style={{
                    background: '#fff',
                    border: '1px solid #ccc',
                    height: 'auto',
                    padding: '5%'
                }}>
                <List loading={this.state.loading} size="middle" itemLayout="vertical" pagination={{
                        pageSize: 5
                    }} dataSource={this.props.shopList} renderItem={item => (<List.Item key={item.id} actions={[
                            <a><Icon type="edit"/>编辑</a>,
                            <a onClick={() => this.showDeleteConfirm(item)}><Icon type="delete"/>删除</a>
                        ]} extra={<img alt = "" src = {
                            item.cover
                        }
                        width = {
                            272
                        } />}>
                        <List.Item.Meta title={item.name} description={<p> {
                                item.phone
                            }
                            </p>}/>
                        <p>{item.address}</p>
                    </List.Item>)}/>
            </div>
        </Content>);
    }
}

export default connect(stateToProps, stateToDispatch)(ManageShop);
