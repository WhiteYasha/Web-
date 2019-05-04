import React, {Component} from 'react';
import './News.css';
import {List, Tag, Icon} from 'antd';
import 'antd/lib/list/style/css';
import 'antd/lib/tag/style/css';
import Newsfilter from './../../component/News/Newsfilter/Newsfilter';
import {connect} from 'react-redux';
import {changeWatchArticle} from './../../action/reducer.js';
import {Link} from 'react-router-dom';
import axios from 'axios';

const stateToProps = state => ({
    showNewsList: state.showNewsList,
    newsState: state.loadState.newsState
});
const stateToDispatch = dispatch => {
    return {
        doChangeWatchArticle: (articleID) => {
            dispatch(changeWatchArticle(articleID));
        }
    };
};

class News extends Component {
    handleClick = (e) => {
        let data = {
            params: {
                id: e.target.id
            }
        };
        axios.get("http://localhost:9000/watchNews", data);
        this.props.doChangeWatchArticle(parseInt(e.target.id));
    }
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
                    loading={!this.props.newsState}
                    dataSource={this.props.showNewsList}
                    pagination={{
                        pageSize: 10
                    }}
                    renderItem={
                        (item, key) => (
                            <List.Item
                                actions={[<Link id={item.id} onClick={this.handleClick} to="/home/news/article">More</Link>]}
                            >
                                <List.Item.Meta
                                    title={item.title}
                                    description={item.tags.map((tag, key) => {
                                        return <Tag key={`tag${key}`}>{tag}</Tag>
                                    })}
                                />
                                <div>
                                    <span>
                                        <Icon type="eye" style={{padding: '0 0.5em'}} />{item.views}
                                    </span>
                                    <span style={{marginLeft: '1em'}}>{item.date}</span>
                                </div>
                            </List.Item>
                        )
                    }
                />
            </div>
        </div>);
    }
}

export default connect(stateToProps, stateToDispatch)(News);
