module.exports = {
    name: 'say',
    category: 'fun',
    description: 'Get the bot to say whatever you want',
    run: async(bot, message, args) => {
        let msg = message.content.split(`${bot.prefix}say `).join("");
        if(!msg) return message.channel.send('Please specify a message!');
        
        message.channel.send(msg);
        
        async function Wait() {
            message.delete();
        }

        setTimeout(Wait, 500);
    }
}