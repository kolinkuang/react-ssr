import React from 'react';
import ReactDom from 'react-dom';
// import App from '../src/App';
import routes from '../src/App';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {getClientStore} from '../src/store/store';
import Header from "../src/component/Header";

const store = getClientStore();

// hydrate to client entry
const Page = (<Provider store={store}>
    <BrowserRouter>
        <Header></Header>
        <Switch>
            {routes.map(route=><Route {...route}></Route>)}
        </Switch>
    </BrowserRouter>
</Provider>);

ReactDom.hydrate(Page, document.getElementById('root'));