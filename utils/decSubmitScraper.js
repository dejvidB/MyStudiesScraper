const login = require('./connect');

module.exports = async (browser, username, password, lessons) => {
    let resp;
    let cLessons;
    let link = "https://my-studies.uoa.gr/Secr3w/app/submit/Submit.aspx?";
    
    let page = await login(browser, username, password);
    if (page === null) {
        return { "status": "login error" };
    }

    for(let i = 0; i < lessons.length; i++)
        link += "MCOID=" + lessons[i].mcocode + "&LESCODE=" + lessons[i].lescode + "&ID=" + lessons[i].id + "&MDR=false&BOOKCONTAINER=-1&";
    
    link += "GOSUBMIT=true";
    
    let response = await page.goto(link);
    let responseBody = await response.text();
    if(responseBody.indexOf("Η δήλωση ολοκληρώθηκε με επιτυχία") !== -1){
        await page.goto('https://my-studies.uoa.gr/Secr3w/app/works.aspx');

        // All lessons
        await page.evaluate(() => {
            return cLess;
        }).then((cLess) => {
            cLessons = cLess;
        });
        resp = { "status": "success", "lessons": cLessons };
    }else if (responseBody.indexOf("Παρουσιάστηκαν λάθη σε ένα η περισσότερα μαθήματα") !== -1 || responseBody.indexOf("ΠΡΟΣΟΧΗ! Η δήλωση δεν έχει ολοκληρωθεί!") !== -1)
        resp = { "status": "declaration error" };
    else
        resp = { "status": "unknown error" };

    // Log out
    await page.goto('https://my-studies.uoa.gr/Secr3w/terminate.aspx');

    await browser.close();

    return resp;
}
