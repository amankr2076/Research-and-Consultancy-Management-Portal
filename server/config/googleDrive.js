const { google }= require('googleapis');
const apikeys = require('../driveapikey.json');
const SCOPE = ['https://www.googleapis.com/auth/drive'];


// A Function that can provide access to google drive api
async function authorize(){
    const jwtClient = new google.auth.JWT(
        apikeys.client_email,
        null,
        apikeys.private_key,
        SCOPE
    );
    await jwtClient.authorize();
    return jwtClient;
}

module.exports = { authorize };