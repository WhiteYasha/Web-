import React, {Component} from 'react';
import {Layout} from 'antd';
import 'antd/lib/layout/style/css';
import E from 'wangeditor';

const {Content} = Layout;

class AddNews extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editorContent: ''
        }
    }
    render() {
        return (<Content style={{
                padding: '16px calc(100% / 24)'
            }}>
            <div ref="editorElem" style={{
                    textAlign: 'left',
                    background: '#fff'
                }}/>

        </Content>);
    }
    componentDidMount() {
        const elem = this.refs.editorElem;
        const editor = new E(elem);
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            this.setState({editorContent: html});
        };
        editor.customConfig.uploadImgServer = 'http://localhost:9000/uploadNewsImg';
        editor.customConfig.uploadFileName = 'newsImg';
        editor.customConfig.uploadImgHooks = {
            customInsert: function (insertImg, result, editor) {
                console.log(result);
                var url = result.data[0];
                insertImg(url);
            }
        }
        editor.create();
    }
};

export default AddNews;
