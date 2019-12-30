// entry of store
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import indexReducer from './index';
import userReducer from './user';

const reducer = combineReducers({
    index: indexReducer,
    user: userReducer
});

const serverAxios = axios.create({
    baseURL: 'http://localhost:9090/'
});
const clientAxios = axios.create({
    baseURL: '/'
});

// create store
// const store = createStore(reducer, applyMiddleware(thunk));

// export default store;
export const getServerStore = () => {
    // to fetch and populate data by server dispatch
    return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)));
};

export const getClientStore = () => {
    // to get data from window.__context
    const defaultState = window.__context || {};
    return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)));
};