const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const fs = require('fs');
const bot = new Discord.Client({ disableMentions: 'everyone'});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.prefix = (prefix);
bot.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});

bot.on('ready', () => {
    require(`./events/client/ready`)(bot);
});

bot.on('message', async message => {
    message.member
    message.author
    require('./events/guild/message')(bot, message)
})

bot.login(process.env.token);