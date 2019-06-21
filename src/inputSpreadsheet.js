var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

//Create a document object using the spreadsheet ID
var doc = new GoogleSpreadsheet('1VYyAPj2NdOC-d_yqja1RyFMn9bie4v2STj4KFKxLglM');

//Authentication

doc.useServiceAccountAuth(creds, function(err) {

    //get all te rows and shit
    doc.getRows(1, function (err, rows) {
        console.log(rows.length);
    })
    submitInfo(doc, 'tabletop fun', 'to have fun', '30', 'will do homework', 'TRUE', '50', 'FALSE')

    
})

//call this when a form is submitted
function submitInfo(doc, activity, description, time, task_for_completion, experience, amount, completed) {
    doc.getRows(1, function(err, rows) {

        nextRow = rows.length+1;

        doc.addRow(1, { activityID: nextRow, activity: activity, description: description, time: time, task_for_completion: task_for_completion, experience:experience, amount:amount, completed:completed}, function(err) {
            if(err) {
                console.log(err);
                
            }
        })
    })
}
