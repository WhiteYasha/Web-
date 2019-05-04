import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AdminApp from './AdminApp';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import appReducer from './action/reducer.js';
import adminAppReducer from './action/adminReducer.js';

const store = createStore(appReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const adminStore = createStore(adminAppReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(<BrowserRouter>
    <Provider store={store}>
        <Route path="/" component={App}/>
    </Provider>
    <Provider store={adminStore}>
        <Route path="/admin" component={AdminApp}/>
    </Provider>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
