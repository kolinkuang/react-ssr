// the code here will be handled by babel
import React from 'react';
import {renderToString} from 'react-dom/server';
import express from 'express';
import routes from '../src/App';
import {StaticRouter, matchPath, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {getServerStore} from '../src/store/store';
import Header from '../src/component/Header';

const store = getServerStore();
const app = express();
app.use(express.static('public'));

app.get('*', (req, res) => {
    // fetch the components rendered based on router, and call loadData() to get data
    // store network request
    const promises = [];
    // use `some` to imitate `<Switch>` behavior of selecting only
    routes.some(route => {
        const match = matchPath(req.path, route);
        if (match) {
            const {loadData} = route.component;
            if (loadData) {
                promises.push(loadData(store));
            }
        }
    });

    // to wait for rendering after all network request is completed
    Promise.all(promises)
        .then(() => {
            const content = renderToString(
                <Provider store={store}>
                    <StaticRouter location={req.url}>
                        <Header></Header>
                        {routes.map(route => <Route {...route}></Route>)}
                    </StaticRouter>
                </Provider>
            );

            // string template
            res.send(`
                    <html>
                        <head>
                            <meta charset='utf-8' />
                            <title>react ssr</title>
                        </head>
                        <body>
                            <div id='root'>${content}</div>
                            <script>
                                window.__context=${JSON.stringify(store.getState())}
                            </script>
                            <script src='/bundle.js'></script>
                        </body>
                    </html>
                `);
        }).catch(e => {
        console.error('Error thrown', e);
        res.send('Server Error 500');
    });

    // // the first to match
    // routes.some(route => {
    //     // use `matchPath` here
    //     const match = matchPath(req.path, route);
    //     if (match) promises.push(route.loadData(match));
    //     return match;
    // });

    // parse react component to html
    // const content = renderToString(App);

});

app.listen(9093, () => {
    console.log('listen completed');
});