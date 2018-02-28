import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./Containers/App";
import registerServiceWorker from "./registerServiceWorker";
import reducer from "./Reducers";
import thunk from "redux-thunk";

/*
    This index.js is the first file loaded in the app. It loads dependencies for the application. These include
    'thunker' middleware for creating a Redux store that works asynchronously.

    React then renders the root container component, ./Containers/App.js, wrapped in the Redux store provider
    and the React Router component. Everything else will be taken care of in App.js and its child components.
 */

//create the thunker middleware
const middleware = [thunk];

//create the store with our reducers and the thunker middleware
let store = createStore(reducer, applyMiddleware(...middleware));

//log the initial state
console.log(store.getState());

//log each state change. This is a very handy tool for debugging
const unsubscribe = store.subscribe(() => console.log(store.getState()));

//finally, render the root component
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
