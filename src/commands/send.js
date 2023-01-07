module.exports = {
    name: 'send',
    description: 'Send content for the chat!',
    async execute(interaction) {
        /*
        let content = await makeOneContent(index);
        let clearedBody = clearContent(content.body);
        const channel = client.channels.cache.get(`${CHANEL_ID}`);
        channel.threads.create({ name: content.title, message: { content: clearedBody }, appliedTags: ['1054876475553239090'] });
        */
        const {makeOneContent, clearContent, indexReset} = require('../functions/crawler');
        const { getNumber, saveNumber } = require('../functions/saveindex');
        
        const CLIENT_ID =  process.env.CLIENT_ID;
        const GUILD_ID =  process.env.GUILD_ID;
        const TOKEN = process.env.DISCORD_TOKEN;
        const CHANEL_ID = process.env.CHANEL_ID;


        // Get index
        let index = getNumber();

        // Get content
        let content = await makeOneContent(index);
        // Clear content
        let clearedBody = clearContent(content.body);

        // Verify if have more than 4000 characters
        if(clearedBody.length > 4000){
            // If larger get the only 4000 chars
            clearedBody = clearedBody.substring(0, 4000);
            
            // Get chanels
            const client = interaction.guild;
            const channel = client.channels.cache.get(`${CHANEL_ID}`);
            channel.threads.create({ name: content.title, message: { content: clearedBody }, appliedTags: ['1054876475553239090'] });

            // Save the index
            await saveNumber(index + 1);
        }
        else{
            // Send
            const channel = client.channels.cache.get(`${CHANEL_ID}`);
            channel.threads.create({ name: content.title, message: { content: clearedBody }, appliedTags: ['1054876475553239090'] });

            // Save the index
            await saveNumber(index + 1);
        }
    }
}