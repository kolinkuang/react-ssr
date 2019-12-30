const express = require('express');
const puppeteer = require('puppeteer');
const axios = require('axios');
const app = express();

async function test() {
    console.log('Snapshotting...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://kaikeba.com/');
    await page.screenshot({path: 'kaikeba.png'});
    await browser.close();
}

// test();

const urlCache = {};
app.get('*', async (req, res) => {
    console.log('req.url:', req.url);

    //1. add cache
    if (urlCache[url]) {
        return res.send(urlCache[url]);
    }
    if (req.url === '/favicon.ico') {
        // no impact to SEO
        return res.send({code: 0});
    }
    const url = 'http://localhost:9093' + req.url;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: ['networkidle0']
    });
    const html = await page.content();
    console.log(html);
    res.send(html);
});

app.listen(8081, () => {
    console.log('SSR server started');
});