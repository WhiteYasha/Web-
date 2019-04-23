import React, {Component} from 'react';
import './Dishselect.css';
import {Radio} from 'antd';
import 'antd/lib/radio/style/css';
import {connect} from 'react-redux';
import {filterDishes} from './../../../action/reducer.js';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const stateToProps = state => ({});
const stateToDispatch = dispatch => {
    return {
        doFilterDishes: (filterType) => {
            dispatch(filterDishes(filterType));
        }
    };
};

var self;

class Dishselect extends Component {
    handleChange(e) {
        var value = e.target.value,
            filterType;
        if (value === "zpc") filterType = "招牌菜";
        else if (value === "tplc") filterType = "头盘冷菜";
        else if (value === "sfmw") filterType = "私房美味";
        else if (value === "jcfw") filterType = "家常风味";
        else if (value === "bbgx") filterType = "煲煲共享";
        else if (value === "tyss") filterType = "田园时蔬";
        else if (value === "mwlt") filterType = "美味靓汤";
        else if (value === "jmdx") filterType = "精美点心";
        else if (value === "yljs") filterType = "饮料酒水";
        else filterType = "全部";
        self.props.doFilterDishes(filterType);
    }
    render() {
        self = this;
        return (
            <div className="dish-select">
                <header>菜品展示</header>
                <RadioGroup defaultValue="all" size="small" onChange={this.handleChange}>
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
            </div>
        );
    }
}

export default connect(stateToProps, stateToDispatch)(Dishselect);
