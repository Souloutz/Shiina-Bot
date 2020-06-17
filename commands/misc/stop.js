const {ownerID} = require('../../config.json');

module.exports = {
    name: 'stop',
    category: 'misc',
    description: 'Stops the bot',
    usage: 'Only accessible by the developer',
    run: async(bot, message, args) => {
        if(message.author.id !== ownerID) return message.channel.send('You do not have permission to access this command!');
        try {
            await message.channel.send('Bot is shutting down!')
            process.exit();
        } catch(e) {
            message.channel.send(`Error: ${e.message}`);
        }
    }
}