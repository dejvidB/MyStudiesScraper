const login = require('./connect');
const load_declarations = require('./declarations');
const load_user_info = require('./user');

module.exports = async (browser, username, password) => {
    let terms = 0;
    let grades;
    let lessons = [];
    let declarations = {};
    let data = {};

    // Connect to my-studies
    let page = await login(browser, username, password);

    if (page === null) {
        return { "status": "error" };
    }

    // Go to main page
    await page.goto('https://my-studies.uoa.gr/Secr3w/app/works.aspx');

    // All lessons
    await page.evaluate(() => {
        return cLess;
    }).then((cLess) => {
        lessons = cLess;
    });

    // All categories
    await page.evaluate(() => {
        return cTree;
    }).then((cTree) => {
        for (let i = 0; i < cTree.length; i++) {
            let caption = cTree[i]["caption"];
            caption = caption.includes("Εξάμηνο") ? ++terms + 'ο ' + caption : caption;
            data[cTree[i]["key"]] = { caption, parent: cTree[i]["parent"] };
        }
    });

    // Declarations
    declarations = await load_declarations(page);

    // Passed/Unpassed lessons history
    await page.goto('https://my-studies.uoa.gr/Secr3w/app/accHistory/accadFooter.aspx');
    await page.evaluate(() => {
        return cAccadArray;
    }).then((cAccadArray) => {
        grades = cAccadArray;
    });

    // User info
    let user_info = await load_user_info(page);

    // log out
    await page.goto('https://my-studies.uoa.gr/Secr3w/terminate.aspx');

    await browser.close();

    return { "status": "success", user_info, terms, grades, data, lessons, declarations };
}
