import React, {Component} from 'react';
import './Shoplist.css';
import {List, Card} from 'antd';
import 'antd/lib/list/style/css';
import 'antd/lib/card/style/css';
import {connect} from 'react-redux';

const {Meta} = Card;
const stateToProps = state => ({shopList: state.shopList});

class Shoplist extends Component {
    render() {
        return (<div className="shoplist">
            <h1 className="shoplist-title">旗下门店</h1>
            <List
                dataSource={this.props.shopList}
                pagination={{
                    pageSize: 12
                }}
                grid={{
                    gutter: 16,
                    column: 3
                }}
                renderItem={(item, key) => (
                    <List.Item>
                        <Card
                            hoverable
                            cover={<img alt="" src={item.cover} />}
                        >
                            <Meta
                                title={item.name}
                                description={<p> {`地址：${item.address}`}<br/>{`订餐电话：${item.phone}`}</p>}
                            />
                        </Card>
                    </List.Item>
                )}
            />
        </div>);
    }
}

export default connect(stateToProps)(Shoplist);
