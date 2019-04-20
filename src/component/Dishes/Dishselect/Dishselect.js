import React, {Component} from 'react';
import './Dishselect.css';
import {Radio} from 'antd';
import 'antd/lib/radio/style/css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Dishselect extends Component {
    render() {
        return (<div className="dish-select">
            <header>菜品展示</header>
            <RadioGroup defaultValue="all" size="small">
                <RadioButton value="all">全部</RadioButton>
                <RadioButton value="zpc">招牌菜</RadioButton>
                <RadioButton value="tplc">头盘冷菜</RadioButton>
                <RadioButton value="sfmw">私房美味</RadioButton>
                <RadioButton value="jcfw">家常风味</RadioButton>
                <RadioButton value="bbgx">煲煲共享</RadioButton>
                <RadioButton value="tyss">田园时蔬</RadioButton>
                <RadioButton value="mwlt">美味靓汤</RadioButton>
                <RadioButton value="jmdx">精美点心</RadioButton>
                <RadioButton value="yljs">饮料酒水</RadioButton>
            </RadioGroup>
        </div>);
    }
}

export default Dishselect;
