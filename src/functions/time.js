/*
Validadate time

basicaly this functions save the current data time in a json
and get the current time
- if has 24h of diference returns true
- if has less than 24h returns false
*/

const fs = require('fs');
const path = require('path');

function saveTime(){
    const date = new Date();
    // Save in utc time
    const time = {
        day: date.getUTCDate(),
        month: date.getUTCMonth(),
        year: date.getUTCFullYear(),
        hour: date.getUTCHours(),
        minute: date.getUTCMinutes(),
        second: date.getUTCSeconds()
    }
    // Use path
    fs.writeFileSync(path.join(__dirname, '../time.json'), JSON.stringify(time));
}

function getTime(){
    // Use path
    try{
        const time = JSON.parse(fs.readFileSync(path.join(__dirname, '../time.json')));
        return time;
    }
    catch(err){
        return null;
    }
}

function validateTime(){
    // If getTime returns empty return true
    // Verify if has 1 our of diference or more
    // If has 1 our of diference return true
    // If has less than 1 our return false
    const time = getTime();
    const date = new Date();
    const currentTime = {
        day: date.getUTCDate(),
        month: date.getUTCMonth(),
        year: date.getUTCFullYear(),
        hour: date.getUTCHours(),
        minute: date.getUTCMinutes(),
        second: date.getUTCSeconds()
    }
    if(time == null){
        saveTime();
        return true;
    }
    else{
        // Verify if have more than 1 hour
        if(Math.abs(currentTime.hour - time.hour) < 1){
            return false;
        }
        else{
            return true;
        }
    }
}

module.exports = {
    saveTime,
    getTime,
    validateTime
}