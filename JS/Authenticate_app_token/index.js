const dotenv = require('dotenv');
const jwt_decode = require('jwt-decode');
const fetch = require('node-fetch');

dotenv.config();
let token = null;
// let token = "eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJcL2FwaVwvdjFcL2F1dGhlbnRpY2F0aW9uIiwiZXNjLmFwcCI6NzY1NywiYXBpX2tleSI6Im1rVE0yMzFRVnk4M1pvYjdReE8zMTdBbjVIN2w1Q3NoNm5UQU1oQ2MiLCJlc2MudXNlciI6bnVsbCwiZXNjLm9yZyI6MTIwODgsImVzYy5vcmdOYW1lIjoiYXBwbHlpbmciLCJpc3MiOiJzcGMtZnJvbnRlbmQwMDFAc3BjLWZyb250ZW5kIiwiZXhwIjoxNjI0NjU3OTMyLCJpYXQiOjE2MjQ2NDM1MzJ9.qM2giNimE7TLMwzhXZYm8mf1c8ZvuP1gOT1Ytdk_bqSOJ_2J1rkAwaXDLnLULQdVcq8G7jisxRF_vzyhlulBsg"


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
    else getDeviceStatus()
}



function getNewAuthToken(){
    fetch(`${baseUrl}authenticate`, {
        method: 'POST',
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json"
        },
      body: `{\"application_token\":\"${process.env.APP_TOKEN}\"}`
    })
    .then(result => result.json())
    .then(result => {
    token = result.auth_token
    getDeviceStatus()
    })
}

function getDeviceStatus(){
    fetch(`${baseUrl}endpoint`, {
        method: 'GET',
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
      })
      .then(result => result.json())
      .then(result => {
        console.log(result)
      })
}

if(isAuthToken()){
    isAuthTokenValid()
}
else getNewAuthToken()


