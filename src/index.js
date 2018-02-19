import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './Reducers';
import thunk from 'redux-thunk';

const middleware = [ thunk ];

let store = createStore(
    reducer,
    applyMiddleware(...middleware)
    );

console.log(store.getState());

const unsubscribe = store.subscribe(() =>
    console.log(store.getState())
)

ReactDOM.render((
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
