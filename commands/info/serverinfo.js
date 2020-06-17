const {MessageEmbed} = require("discord.js");
const colors = require("../../colors.json");
const moment = require('moment');
require('moment-duration-format');

module.exports = {
    name:'serverinfo',
    category:'info',
    description: 'Displays server info',
    aliases: ['server'],
    run: async(bot, message, args) => {
        const Server = new MessageEmbed()
            .setColor(colors.orange)
            .setThumbnail(message.guild.iconURL())
            .setAuthor(message.guild.name, message.guild.iconURL())
            .addField('Name', message.guild.name, true)
            .addField('Owner', message.guild.owner, true)
            .addField('ID', message.guild.id, false)
            .addField('Members', message.guild.memberCount, true)
            .addField('Roles', message.guild.roles.cache.size, true)
            .addField('Bots', message.guild.members.bots.cache.size, true)
            .addField('Verification Level', message.guild.verificationLevel, false)
            .addField('Created', moment.utc(message.guild.createdAt).format("ddd, MMMM Do, YYYY, hh:mm:ss A"), true)
            .setFooter(`Shiina | Created by Souloutz#0038`)
        message.channel.send(Server);
    }
};


