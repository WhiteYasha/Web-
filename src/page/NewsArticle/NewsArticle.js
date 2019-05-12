import React, {Component} from 'react';
import {Row, Col} from 'antd';
import './NewsArticle.css';
import 'antd/lib/row/style/css';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import "github-markdown-css/github-markdown.css";

const stateToProps = state => ({
    watchArticle: state.watchArticleID === -1
        ? null
        : state.newsList.filter((item) => item.id === state.watchArticleID)[0]
});

class NewsArticle extends Component {
    render() {
        if (this.props.watchArticle === null)
            return <Redirect to="/news"/>
        else
            return (<div style={{
                    background: "rgb(240, 240, 239)",
                    padding: '0 0 60px 0'
                }}>
                <div className="page-cover news-page-cover">
                    <header>新闻中心</header>
                    <section>挑战蕴含机遇，创新成就伟业。</section>
                </div>
                <div className="article-header">
                    <Row style={{
                            height: '70%'
                        }}>
                        <Col span={20} offset={2} className="article-header-title">
                            {this.props.watchArticle.title}
                        </Col>
                    </Row>
                    <Row style={{
                            height: '30%'
                        }}>
                        <Col span={6} className="article-header-section">
                            {`作者: ${this.props.watchArticle.author}`}
                        </Col>
                        <Col span={6} className="article-header-section">
                            {`来源: ${this.props.watchArticle.source}`}
                        </Col>
                        <Col span={6} className="article-header-section">
                            {`发表时间: ${this.props.watchArticle.date}`}
                        </Col>
                        <Col span={6} className="article-header-section">
                            {`浏览数: ${this.props.watchArticle.views}`}
                        </Col>
                    </Row>
                </div>
                <div dangerouslySetInnerHTML={{__html: this.props.watchArticle.content}} className="article-content"/>
            </div>);
        }
    }

export default connect(stateToProps)(NewsArticle);
