module.exports = async (browser, username, password) => {
    let page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', interceptedRequest => {
        let data = {
            'method': 'POST',
            'postData': 'username=' + username + '&password=' + password + '&connect=%CE%A3%CF%8D%CE%BD%CE%B4%CE%B5%CF%83%CE%B7&casheusage=cashe',
            'headers': {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };
        interceptedRequest.continue(data);
    });
    const response = await page.goto('https://my-studies.uoa.gr/Secr3w/connect.aspx');
    const responseBody = await response.text();

    if (responseBody.includes("Αποτυχία Σύνδεσης")) {
        page = null;
    }
    return page;
}
