/*
This just save a number into a json object
and read this number
*/

const fs = require('fs');

function saveNumber(number){
    const data = {
        number: number
    }
    fs.writeFileSync('./number.json', JSON.stringify(data));
}

function getNumber(){
    const data = JSON.parse(fs.readFileSync('./number.json'));
    return data.number;
}

module.exports = {
    saveNumber,
    getNumber
}