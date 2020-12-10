module.exports = async (page) => {
    response = await page.goto('https://my-studies.uoa.gr/Secr3w/app/userprofile/generalInfo.aspx');
    responseBody = await response.text();

    const user_info = responseBody.slice(responseBody.indexOf('<p class="TitleText">') + 21, responseBody.indexOf(') <') + 1);
    const name = user_info.slice(0, user_info.indexOf('('));
    const am = user_info.slice(user_info.indexOf('(') + 1, user_info.indexOf('-'));
    const uni = user_info.slice(user_info.indexOf('-') + 1, user_info.indexOf(')'));
    const semester = parseInt(responseBody.slice(responseBody.indexOf('Εξάμηνο Φοίτησης","') + 19, responseBody.indexOf('Εξάμηνο Φοίτησης","') + 22));
    return {"username": name, "uid": am, "university": uni, semester};
}
