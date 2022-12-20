/*
Validadate time

basicaly this functions save the current data time in a json
and get the current time
- if has 24h of diference returns true
- if has less than 24h returns false
*/

const fs = require('fs');

function saveTime(){
    const date = new Date();
    const time = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
    }
    fs.writeFileSync('./time.json', JSON.stringify(time));
}

function getTime(){
    const time = JSON.parse(fs.readFileSync('./time.json'));
    return time;
}

function validateTime(){
    // If getTime returns empty return true
    try{
        const time = getTime();
        const date = new Date();
        const currentTime = {
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        }
        if (time.day == currentTime.day && time.month == currentTime.month && time.year == currentTime.year){
            return false;
        }
        else{
            return true;
        }
    }
    catch{
        return true;
    }
}

module.exports = {
    saveTime,
    getTime,
    validateTime
}