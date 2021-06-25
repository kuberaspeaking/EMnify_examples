const dotenv = require('dotenv');
const jwt_decode = require('jwt-decode');
const fetch = require('node-fetch');

dotenv.config();
let token = null;


const baseUrl = 'https://cdn.emnify.net/api/v1/';


function isAuthToken(){
    let bool  = (token == null) ? 0:1;
    return bool
}

function isAuthTokenValid(){
    let decodedToken = jwt_decode(token);
    let currentDate = new Date();

    if(decodedToken.exp * 1000 < currentDate.getTime()){
        getNewAuthToken()
    }
    else {
        // Make API call
    }
}

function getNewAuthToken(){
    fetch(`${baseUrl}authenticate`, {
        method: 'POST',
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json"
        },
      body: `{\"application_token\":\"${process.env.APP_TOKEN}\"}` // Enter your application token in place of ${process.env.APP_TOKEN}
    })
    .then(result => result.json())
    .then(result => {
    token = result.auth_token
    console.log("Your token is : "+token);
    // Make API call
    })
}

if(isAuthToken()){
    isAuthTokenValid()
}
else getNewAuthToken()


