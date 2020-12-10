let express = require('express');
let router = express.Router();

const scraper = require('../utils/decSubmitScraper');
const puppeteer = require('puppeteer');

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

async function scrapeAll(browserInstance, username, password, lessons) {
    try {
        let browser = await browserInstance;
        const data = await scraper(browser, username, password, lessons);
        return data;
    } catch (err) {
        throw err;
    }
}

router.post('/', (req, res, next) => {
    if (!req.body.username.length || !req.body.password.length) {
        res.statusCode = 200;
        res.json({ "status": "login error" });
    }
    let browserInstance = startBrowser();
    scrapeAll(browserInstance, req.body.username, req.body.password, req.body.lessons)
        .then(data => {
            res.statusCode = 200;
            res.json(data);
        });
});

module.exports = router;
