import React, {Component} from 'react';
import './Dishes.css';
import Dishselect from './../../component/Dishes/Dishselect/Dishselect';
import {List, Icon, Rate, Card, Tag} from 'antd';
import 'antd/lib/list/style/css';
import 'antd/lib/tag/style/css';
import 'antd/lib/card/style/css';
import 'antd/lib/rate/style/css';
import * as dishCovers from './../../img/dishesImgList.js';
import {connect} from 'react-redux';

const {Meta} = Card;
const listHeader = (<header className="dishes-list-header">
    <Icon type="coffee" style={{
            fontSize: '24px',
            padding: '0 0.2em'
        }}/>
    <span>DISH DISPLAY</span>
    <section>Create a food life</section>
</header>);
const stateToProps = state => ({
    showDishesList: state.showDishesList,
    dishState: state.loadState.dishState
});

class Dishes extends Component {
    render() {
        return (<div style={{
                background: 'rgb(240, 240, 230)',
                padding: '0 0 60px 0'
            }}>
            <div className="page-cover dishes-page-cover">
                <header>菜品展示</header>
                <section>创造美食人生。</section>
            </div>
            <Dishselect/>
            <div className="dishes-content">
                <List
                    grid={{
                        gutter: 16,
                        column: 3
                    }}
                    loading={!this.props.dishState}
                    header={listHeader}
                    dataSource={this.props.showDishesList}
                    pagination={{
                        pageSize: 12
                    }}
                    renderItem={(item, key) => (
                    <List.Item>
                        <Card
                            hoverable
                            cover={<img alt="" src = {dishCovers[`dish${item.id}`]} />}
                        >
                            <Meta
                                title={item.name}
                                description={
                                    <div>
                                        <div>
                                            {
                                                item.tags.map((tag, tagKey) => {
                                                    return <Tag key={`${key}dish${tagKey}`}>{tag}</Tag>;
                                                })
                                            }
                                        </div>
                                        <section>{item.introduction}</section>
                                        <Rate disabled allowHalf defaultValue={item.rate}/>
                                    </div>
                                }
                            />
                        </Card>
                    </List.Item>
                    )}
                />
            </div>
        </div>);
    }
}

export default connect(stateToProps)(Dishes);
