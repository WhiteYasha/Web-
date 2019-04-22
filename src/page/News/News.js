import React, {Component} from 'react';
import './News.css';
import {List, Tag} from 'antd';
import 'antd/lib/list/style/css';
import 'antd/lib/tag/style/css';
import Newsfilter from './../../component/News/Newsfilter/Newsfilter';
import {connect} from 'react-redux';

const stateToProps = state => ({newsList: state.newsList});

class News extends Component {
    render() {
        return (
            <div style={{
                background: 'rgb(240, 240, 230)',
                padding: '0 0 60px 0'
            }}>
            <div className="page-cover news-page-cover">
                <header>新闻中心</header>
                <section>挑战蕴含机遇，创新成就伟业。</section>
            </div>
            <Newsfilter/>
            <div className="news-content">
                <List
                    bordered
                    dataSource={this.props.newsList}
                    pagination={{
                        pageSize: 10
                    }}
                    renderItem={
                        item => (
                            <List.Item actions={[<a href="#">More</a>]}>
                                <List.Item.Meta
                                    title={item.title}
                                    description={item.tags.map((tag, key) => {
                                        return <Tag key={`tag${key}`}>{tag}</Tag>
                                    })}
                                />
                            </List.Item>
                        )
                    }
                />
            </div>
        </div>);
    }
}

export default connect(stateToProps)(News);
