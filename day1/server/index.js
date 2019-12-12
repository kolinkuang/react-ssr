// the code here will be handled by babel
import React from 'react';
import {renderToString} from 'react-dom/server';
import express from 'express';
import App from '../src/App';
import {StaticRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '../src/store/store';

const app = express();
app.use(express.static('public'));

app.get('*', (req, res) => {
    // parse react component to html
    // const content = renderToString(App);
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url}>
                {App}
            </StaticRouter>
        </Provider>
    );

    // string template
    res.send(`
        <html>
            <head>
                <meta charset="utf-8" />
                <title>react ssr</title>
            </head>
            <body>
                <div id="root">${content}</div>
                <script src="/bundle.js"></script>
            </body>
        </html>
    `);
});

app.listen(9093, () => {
    console.log('listen completed');
});