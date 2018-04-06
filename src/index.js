import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {Router} from "react-router-dom";
import "./index.css";
import App from "./Containers/App";
import registerServiceWorker from "./registerServiceWorker";
import reducer from "./Reducers";
import thunk from "redux-thunk";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {PersistGate} from 'redux-persist/integration/react';
import History from "./Utils/History";

/*
    This index.js is the first file loaded in the app. It loads dependencies for the application. These include
    'thunker' middleware for creating a Redux store that works asynchronously.

    React then renders the root container component, ./Containers/App.js, wrapped in the Redux store provider
    and the React Router component. Everything else will be taken care of in App.js and its child components.
 */

//create the middleware

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

const middleware = [thunk];

//create the store with our reducers and the thunker middleware
let store = createStore(persistedReducer, applyMiddleware(...middleware));
let persistor = persistStore(store);

//log the initial state
console.log(store.getState());

//log each state change. This is a very handy tool for debugging
const unsubscribe = store.subscribe(() => console.log(store.getState())); // eslint-disable-line no-unused-vars

//finally, render the root component
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router history={History}>
                <App/>
            </Router>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();
