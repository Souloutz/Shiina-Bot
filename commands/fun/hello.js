module.exports = {
    name: 'hello',
    category: 'fun',
    description: 'Hey user',
    run: async(bot, message, args) => {
        message.channel.send(`Hey <@${message.author.id}>!`);
    }
}