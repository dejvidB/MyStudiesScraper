module.exports = async (page) => {
    let declarations = {};
    await page.goto('https://my-studies.uoa.gr/Secr3w/app/declareHistory/default.aspx');
    await page.evaluate(() => {
        return top.declarefooter.cDeclareArray;
    }).then((cDeclareArray) => {
        for (let i = 0; i < cDeclareArray.length; i++) {
            if (declarations.hasOwnProperty(cDeclareArray[i].perdescr))
                declarations[cDeclareArray[i].perdescr].push({ "name": cDeclareArray[i].lesdescr, "term": cDeclareArray[i].termin });
            else {
                declarations[cDeclareArray[i].perdescr] = [];
                declarations[cDeclareArray[i].perdescr].push({ "name": cDeclareArray[i].lesdescr, "term": cDeclareArray[i].termin });
            }
        }
    });
    return declarations;
}
