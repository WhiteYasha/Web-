import React, {Component} from 'react';
import {Map, Marker, InfoWindow} from 'react-amap';
import {Typography} from 'antd';

const {Paragraph} = Typography;
const position = {
    longitude: 120.1672910000,
    latitude: 30.2732440000
}

class Contactmap extends Component {
    constructor() {
        super();
        this.state = {infoVisible: true};
    }
    toggleVisible = () => {
        if (this.state.infoVisible) {
            this.setState({infoVisible: false});
        }
        else {
            this.setState({infoVisible: true});
        }
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }
    render() {
        return (
            <div style={{margin: '0 20%', background: '#fff', padding: '5%'}}>
                <div style={{height: '500px', marginBottom: '50px'}}>
                    <Map
                        amapkey="8b65977e3984c14369cd7c3b142ace6b"
                        zoom="18"
                        center={position}
                    >
                        <Marker
                            position={position}
                            clickable
                            events={{click: this.toggleVisible}}
                        />
                        <InfoWindow
                            position={position}
                            visible={this.state.infoVisible}
                            events={{close: this.toggleVisible}}
                        >
                            <h3 style={{color: '#e30202'}}>新白鹿餐厅</h3>
                            <p>总部电话：0571-88025588</p>
                            <p>传真：0571-87915560</p>
                            <p>网址：www.bailu.cc www.xinbailu.cc</p>
                            <p>地址：浙江省杭州市中山北路572号</p>
                        </InfoWindow>
                    </Map>
                </div>
                <div>
                    <Paragraph>总部电话：0571-88025588</Paragraph>
                    <Paragraph>联系人：何小姐</Paragraph>
                    <Paragraph>传真：0571-87915560</Paragraph>
                    <Paragraph>邮箱：2644158926@qq.com</Paragraph>
                    <Paragraph>网址：www.bailu.cc www.xinbailu.cc</Paragraph>
                    <Paragraph>地址：浙江省杭州市中山北路572号</Paragraph>
                </div>
            </div>
        );
    }
}

export default Contactmap;
