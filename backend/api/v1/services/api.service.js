const https = require('https');
const fs = require('fs');
const path = require('path');

function get(host, port, _path){
    return new Promise((resolve, reject) =>{
        const options = {
            host, port, path: _path, method: 'GET'
        }
        const req = https.request(options, res=>{
            let body = '';
            res.on('data', d =>{ body += d; });
            res.on('end', () =>{ resolve(JSON.parse(body)); });
        });
        req.on('error', error => { reject(error); });
        req.end();
    });
}

function post(host, port, _path, body, token){
    return new Promise((resolve, reject) =>{
        body = JSON.stringify(body);
        const options = {
            host, port, path: _path, method: 'POST',
            headers: { 'Content-Type':'application/json', 'Content-Length': body.length, 'Authorization': 'Bearer ' + token }
        }
        const req = https.request(options, res=>{
            let body = '';
            res.on('data', d =>{ body += d; });
            res.on('end', () =>{ resolve(JSON.parse(body)); });
        });
        req.on('error', error => { reject(error); });
        req.write(body);
        req.end();
    });
}

module.exports = {
    get, post,
}