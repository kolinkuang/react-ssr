//purely mock couples of interfaces

const express = require('express');
const app = express();

app.get('/api/user/info', (req, res) => {
    // support cross site calling
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.json({
        code: 0,
        data: {
            name: 'KaikeBa',
            best: 'DaSheng'
        }
    });
});

app.get('/api/course/list', (req, res) => {
    // support cross site calling
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.json({
        code: 0,
        list: [
            {name: 'web fullstack', id: 1},
            {name: 'js high class', id: 2},
            {name: 'web junior', id: 3},
            {name: 'java architect', id: 4}
        ]
    });
});

app.listen(9090, () => {
    console.log('mock startup complete');
});