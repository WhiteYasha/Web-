import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import {connect} from 'react-redux';

const stateToProps = state => ({
    visitList: state.visitList
});

class VisitChart extends Component {
    dateList = this.props.visitList.map((item) => item.day);
    valueList = this.props.visitList.map((item) => item.number);
    options = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.dateList
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: this.valueList,
            type: 'line',
            itemStyle: {
                color: 'rgb(0, 134, 255)'
            },
            lineStyle: {
                color: 'rgb(0, 134, 255, 0.8)'
            },
            areaStyle: {
                color: 'rgba(0, 134, 255, 0.6)'
            }
        }]
    }
    render() {
        return (
            <ReactEcharts
                option={this.options}
                style={{background: '#fff'}}
            />
        );
    }
}

export default connect(stateToProps)(VisitChart);
