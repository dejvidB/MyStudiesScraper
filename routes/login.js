let express = require('express');
let router = express.Router();

const puppeteer = require('puppeteer');

const scraper = require('../utils/loginScraper');
const sample = require('../utils/sample.json');

const startBrowser = async () => {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ["--incognito",
                "--no-sandbox",
                "--single-process",
                "--no-zygote"],
            'ignoreHTTPSErrors': true
        });
    } catch (err) {
        throw err;
    }
    return browser;
}

async function scrapeAll(browserInstance, username, password) {
    try {
        let browser = await browserInstance;
        const data = await scraper(browser, username, password);
        return data;
    } catch (err) {
        throw err;
    }
}

router.post('/', (req, res, next) => {
    res.send(sample);
    res.end();
});

module.exports = router;
