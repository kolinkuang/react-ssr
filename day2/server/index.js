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
    routes.some(route => {
        const loadData = route.component.loadData;
        if (matchPath(req.path, route) && !!loadData) {
            promises.push(loadData(store));
            // in order to handle the case when async task goes wrong and page is not rendered
            // promises.push(
            //     new Promise(resolve => {
            //         loadData(store)
            //             .then(resolve)
            //             .catch(e => {
            //                 console.error('Error thrown from index.js', e);
            //                 resolve(e);
            //             });
            //     })
            // );
        }
    });

    // to wait for rendering after all network request is completed
    Promise.all(promises)
        .then(() => {
            // renderPage(req, res, store);
        })
        .catch(e => {
            console.error('Error thrown from index.js', e);
            // res.send('Server Error 500');
        })
        .finally(() => {
            // NOTICE: in order to handle the case when async task goes wrong and page is not rendered
            renderPage(req, res, store);
        })

});

function renderPage(req, res, store) {
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
}

app.listen(9093, () => {
    console.log('listen completed');
});