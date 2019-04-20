import React, {Component} from 'react';
import './App.css';
import Home from './page/Home/Home';
import News from './page/News/News';
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import {Route, Switch} from 'react-router-dom';
// eslint-disable-next-line {/*引入文件*/}

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/news" component={News} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default App;
