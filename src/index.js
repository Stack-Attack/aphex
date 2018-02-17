import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './Reducers';
import thunkMiddleware from 'redux-thunk';

let store = createStore(reducer);

ReactDOM.render((
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
