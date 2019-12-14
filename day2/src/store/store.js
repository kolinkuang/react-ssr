// entry of store
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import indexReducer from './index';
import userReducer from './user';

const reducer = combineReducers({
    index: indexReducer,
    user: userReducer
});

// create store
// const store = createStore(reducer, applyMiddleware(thunk));

// export default store;
export const getServerStore = () => {
    // to fetch and populate data by server dispatch
    return createStore(reducer, applyMiddleware(thunk));
};

export const getClientStore = () => {
    // to get data from window.__context
    const defaultState = window.__context || {};
    return createStore(reducer, defaultState);
};