import React, {Component} from 'react';
import {Layout, Breadcrumb, Row, Col} from 'antd';
import 'antd/lib/layout/style/css';
import 'antd/lib/row/style/css';
import 'antd/lib/breadcrumb/style/css';
import {connect} from 'react-redux';

const {Header} = Layout;
const stateToProps = state => ({
    breadPath: state.breadPath
});

class adminHeader extends Component {
    render() {
        return (
            <Layout>
                <Header style={{background: '#fff', padding: 0}}>
                    header
                </Header>
                <Row>
                    <Col span={23} offset={1}>
                        <Breadcrumb style={{margin: '0.5em 0'}}>
                        {
                            this.props.breadPath.map((item, key) => {
                                return <Breadcrumb.Item key={`bread${key}`}>{item}</Breadcrumb.Item>
                            })
                        }
                        </Breadcrumb>
                    </Col>
                </Row>
            </Layout>
        );
    }
}

export default connect(stateToProps)(adminHeader);
