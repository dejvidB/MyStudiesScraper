module.exports = async (page) => {
    response = await page.goto('https://my-studies.uoa.gr/Secr3w/app/userprofile/generalInfo.aspx');
    responseBody = await response.text();
    
    const user_info = responseBody.slice(responseBody.indexOf('<p class="TitleText">') + 21, responseBody.indexOf(') <') + 1);
    const name = user_info.slice(0, user_info.indexOf('('));
    const am = user_info.slice(user_info.indexOf('(') + 1, user_info.indexOf('-'));
    const uni = user_info.slice(user_info.indexOf('-') + 1, user_info.indexOf(')'));
    const semester = parseInt(responseBody.slice(responseBody.indexOf('Εξάμηνο Φοίτησης","') + 19, responseBody.indexOf('Εξάμηνο Φοίτησης","') + 22));

    let allLines = responseBody.split('\n');

    let info = ["Ημερομηνία 1ης Εγγραφής", 	"Εξάμηνο Φοίτησης", "Όνομα Πατέρα", "Όνομα Μητέρας",
                "Ημερομηνία Γέννησης", "Πόλη/Χωριό Γέννησης", "Αριθμός Ταυτότητας",
                "Ημερομηνία Έκδοσης", "AMKA", "Μόνιμη Διεύθυνση Κατοικίας", "ΤΚ Μόνιμης Κατοικίας", "Τηλέφωνο Προσωρινής Κατοικίας"];
    
    let user_data = [];
    for(let i = 0; i < info.length; i++){
        let index = responseBody.indexOf(info[i]);
        let tempString = responseBody.substring(0, index);
        let line = allLines[tempString.split('\n').length - 1];
        let key = info[i];
        let obj = {};
        obj[key] = line.substring(line.indexOf('","') + 3, line.indexOf('")'))
        user_data.push(obj);
    }

    return {"username": name, "uid": am, "university": uni, semester, data: user_data};
}
