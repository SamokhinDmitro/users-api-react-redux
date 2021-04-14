import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducers from "./redux/rootReducers";
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';

import {BrowserRouter} from 'react-router-dom';

//Для работы REDUX devTools Chrome
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(reduxThunk)));


/*
store.subscribe(() => {
    console.log('Subscribe', store.getState());
});
 */



const app = (
    <BrowserRouter>
        <Provider store={store}>
            {/*<React.StrictMode>*/}
                <App />
            {/*</React.StrictMode>*/}
        </Provider>
    </BrowserRouter>
);


ReactDOM.render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
