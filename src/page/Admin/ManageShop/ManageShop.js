import React, {Component} from 'react';
import {List, Icon, Modal, message} from 'antd';
import {connect} from 'react-redux';
import axios from 'axios';
import {deleteShop, updateShop} from './../../../action/adminReducer.js';
import EditShop from './../../../component/Admin/EditShop/EditShop';

const confirm = Modal.confirm;
const stateToProps = state => ({shopList: state.shopList});
const stateToDispatch = dispatch => {
    return {
        doDeleteShop: (id) => {
            dispatch(deleteShop(id));
        },
        doUpdateShop: (shop) => {
            dispatch(updateShop(shop));
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

class ManageShop extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: false, visible: false, selectShop: null};
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
    handleUpdate = (shop) => {
        console.log(shop);
        this.setState({visible: true, selectShop: shop});
    }
    handleSubmit = (e) => {
        let shop = {
            id: this.refs.shopContent.state.id,
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
        this.props.doUpdateShop(shop);
        axios.get("http://localhost:9001/updateShop", {params: shop})
        .then(() => {
            message.success("修改成功!");
            this.setState({loading: false, visible: false, selectShop: null});
        });
    }
    render() {
        return (
            <div>
                <List
                    loading={this.state.loading}
                    size="middle"
                    itemLayout="vertical"
                    pagination={{pageSize: 5}}
                    dataSource={this.props.shopList}
                    renderItem={item => (
                        <List.Item
                            key={item.id}
                            actions={[
                                <a onClick={() => this.handleUpdate(item)}><Icon type="edit"/>编辑</a>,
                                <a onClick={() => this.showDeleteConfirm(item)}><Icon type="delete"/>删除</a>
                            ]}
                            extra={<img alt="" src={item.cover} width={272} />}
                        >
                            <List.Item.Meta title={item.name} description={<p>{item.phone}</p>} />
                            <p>{item.address}</p>
                        </List.Item>
                    )}
                />
                <Modal
                    title="编辑店铺"
                    visible={this.state.visible}
                    width={1024}
                    okText="确定修改"
                    cancelText="取消"
                    onOk={this.handleSubmit}
                    onCancel={() => this.setState({visible: false})}
                    destroyOnClose
                >
                    <EditShop defaultValue={this.state.selectShop} ref="shopContent" loading={this.state.loading} />
                </Modal>
            </div>);
    }
}

export default connect(stateToProps, stateToDispatch)(ManageShop);
