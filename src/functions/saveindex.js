/*
This just save a number into a json object
and read this number
*/

const fs = require('fs');
const path = require('path');

function saveNumber(number){
    const data = {
        number: number
    }
    fs.writeFileSync(path.join(__dirname, '../number.json'), JSON.stringify(data));
}

function getNumber(){
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../number.json')));
    return data.number;
}

module.exports = {
    saveNumber,
    getNumber
}