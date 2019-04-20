import React, {Component} from 'react';
import Information from './../../component/Home/Information/Information';
import Shoplist from './../../component/Home/Shoplist/Shoplist';

class Home extends Component {
    render() {
        return (
            <div>
                <Information />
                <Shoplist />
            </div>
        );
    }
}

export default Home;
