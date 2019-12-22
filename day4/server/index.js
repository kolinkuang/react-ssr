// the code here will be handled by babel
import path from 'path';
import fs from 'fs';
import React from 'react';
import {renderToString} from 'react-dom/server';
import express from 'express';
import proxy from 'http-proxy-middleware';
import routes from '../src/App';
import {StaticRouter, matchPath, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {getServerStore} from '../src/store/store';
import Header from '../src/component/Header';

const store = getServerStore();
const app = express();
app.use(express.static('public'));

app.use(
    '/api',
    proxy({target: 'http://localhost:9090', changeOrigin: true})
);

function csrRender(res) {
    // read CSR file and return
    const filename = path.resolve(process.cwd(), 'public/index.csr.html');
    const html = fs.readFileSync(filename, 'utf-8');
    return res.send(html);
}

app.get('*', (req, res) => {
    if (req.query._mode === 'csr') {
        console.log('CSR degradation is triggered by URL parameters');
        return csrRender(res);
    }

    // to open CSR by config

    // to open CSR during high server payload

    // if (req.url.startsWith('/api/')) {
    //     // not render page, just dispatch request via axios.get
    // }

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

    // if we know that those route(s) doesn't exist...
    // to wait for rendering after all network request is completed
    Promise.all(promises)
        .catch(e => {
            console.error('Error thrown from index.js', e);
        })
        .finally(() => {
            // NOTICE: in order to handle the case when async task goes wrong and page is not rendered
            renderPage(req, res, store);
        })

});

function renderPage(req, res, store) {
    const context = {
        css: []
    };
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <Header></Header>
                <Switch>
                    {routes.map(route => <Route {...route}></Route>)}
                </Switch>
            </StaticRouter>
        </Provider>
    );

    console.log('context', context);
    if (context.statusCode) {
        // to switch status and page
        res.status(context.statusCode);
    }

    if (context.action === 'REPLACE') {
        res.redirect(301, context.url);
    }

    const css = context.css.join('\n');

    // string template
    res.send(`
            <html>
                <head>
                    <meta charset='utf-8' />
                    <title>react ssr</title>
                    <style>
                        ${css}
                    </style>
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