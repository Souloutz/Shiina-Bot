module.exports = {
    name: 'boop',
    category: 'misc',
    description: 'Tests if the bot is responding',
    run: async(bot, message, args) => {
        message.channel.send('Boop!');
    }
}