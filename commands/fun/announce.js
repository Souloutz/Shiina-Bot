const {MessageEmbed} = require('discord.js');
const colors = require('../../colors.json');

module.exports = {
    name: 'announce',
    category: 'fun',
    description: 'Get the bot to say whatever you want in a specific channel!',
    usage: '<channel> <announcement>',
    run: async(bot, message, args) => {
        const permissions = message.member.hasPermission("MANAGE_CHANNELS", "ADMINISTRATOR");
        if(!permissions) return message.channel.send('You do not have permission to execute this command!');

        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if(!channel) return message.channel.send('Please specify the channel!');
        
        let msg = message.content.split(`${bot.prefix}announce ${channel} `).join("");
        if(!msg) return message.channel.send('Please specify a message!');
            const Announce = new MessageEmbed()
            .setTitle('Announcement!')
            .setDescription(msg)
            .setColor(colors.peach)
        channel.send(Announce);

        async function Wait() {
            message.delete();
        }

        setTimeout(Wait, 500);
    }
}