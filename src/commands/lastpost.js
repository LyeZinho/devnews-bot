module.exports = {
    name: 'lastpost',
    description: 'Show when is sent the last post!',
    async execute(interaction) {
        const { getTime } = require('../functions/time')
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
            await interaction.reply(`The last post was sent at ${time.hour}:${time.minute}:${time.second}`);
        }
        else{
            await interaction.reply(`The last post was sent at ${time.day}/${time.month}/${time.year} ${time.hour}:${time.minute}:${time.second}`);
        }
    }
}