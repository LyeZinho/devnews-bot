// Express server
const express = require('express');
const app = express();

// Discord bot
require('dotenv').config();
const { Client, Routes, InteractionType } = require('discord.js');
const { REST } = require('@discordjs/rest');

const CLIENT_ID =  process.env.CLIENT_ID;
const GUILD_ID =  process.env.GUILD_ID;
const TOKEN = process.env.DISCORD_TOKEN;
const CHANEL_ID = process.env.CHANEL_ID;

const client = new Client({
    intents: [
        "GuildMembers",
        "Guilds",
        "GuildMessages",
        "GuildMessageReactions",
    ],
});


// Discord bot commands
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
client.on('ready', () => {console.log(`Logged in as ${client.user.tag}!`);});

// Program

/*
How this bot works
basicaly this get news from crawler
and make a post for specific chat in server

this bot make post for each day 
and validate using the time.js function on ./functions
*/

const {saveTime, validateTime} = require('./functions/time');
const {makeOneContent, clearContent} = require('./functions/crawler');
const {saveNumber, getNumber} = require('./functions/saveindex')

// Timer
// Interval every minute
setInterval(async function(){
    if (validateTime()){
        // Get the number of the last post
        const number = getNumber();
        // Get the news
        const news = await makeOneContent(number).then((data) => {
            // Clear content
            const content = clearContent(data.body);

            // Save the number of the last post
            saveNumber(number + 1);

            // Save the time of the last post
            saveTime();

            // Send the news
            const channel = client.channels.cache.get(`${CHANEL_ID}`);
            channel.threads.create({ name: data.title, message: { content: content }, appliedTags: ['1054876475553239090'] });

            console.log("News sent!");
        });
    }
    else {
        console.log("Not time yet!");
    }
}, 60000);
        




function commandDataReader(){
    // Read each file in the commands folder
    const fs = require('fs');
    const path = require('path');
    const commandFiles = fs.readdirSync('/commands/').filter(file => file.endsWith('.js'));
    const commandsData = [];
    for (const file of commandFiles) {
        const command = require(`/commands/${file}`);
        commandsData.push(command);
    }
    return commandsData;
}

function commandReader(){
    // Read each file in the commands folder
    // But get only the name and description
    const fs = require('fs');
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    const commandsData = [];
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        commandsData.push({
            name: command.name,
            description: command.description,
            options: command.options
        });
    }
    return commandsData;
}


const commandsData = commandDataReader();


// Command handler
client.on('interactionCreate', async Interaction => {
    if (!Interaction.isCommand()) return;
    const { commandName } = Interaction;
    
    for (const command of commandsData) {
        if (command.name === commandName) {
            try {
                await command.execute(Interaction);
            } catch (error) {
                console.error(error);
                await Interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
});

async function main(){
    try {
        console.log('Started refreshing application (/) commands.');

        const commands = commandDataReader();

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {
                body: commands,
            }
        );

        console.log('Successfully reloaded application (/) commands.');

        client.login(TOKEN);
    } catch (error) {
        console.error(error);
    }
}

main();


// Listener
app.listen(3000, () => {
    console.log('Server running on port 3000');
    }
);