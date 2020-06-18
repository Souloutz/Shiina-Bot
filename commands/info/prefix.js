const {prefix} = require('../../config.json');

module.exports = {
    name: 'prefix',
    category: 'info',
    description: 'Displays the bot prefix',
    run: async(bot, message, args) => {
        return message.channel.send(`My prefix is \`${bot.prefix}\`, <@${message.author.id}>!\nFor more information about my commands, please use \`${bot.prefix}help\`!`);
    }
}