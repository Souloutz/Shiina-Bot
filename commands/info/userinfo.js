const {MessageEmbed} = require("discord.js");
const colors = require("../../colors.json");
const moment = require('moment');
require('moment-duration-format');

const status = {
    online: 'Online',
    idle: 'Idle',
    dnd: 'Do Not Disturb',
    offline: 'Offline'
};

module.exports = {
    name: 'userinfo',
    category: 'info',
    description: 'Displays user info',
    usage: '[user]',
    aliases: ["user"],
    run: async(bot, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);
        const Info = new MessageEmbed()
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512}))
            .setColor(colors.peach)
            .addField('User', [
                `**Username:** ${member.user.username}`,
                `**Discriminator:** ${member.user.discriminator}`,
                `**ID:** ${member.id}`,
                `**Avatar:** [Link to Avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
                `**Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')}, ${moment(member.user.createdTimestamp).fromNow()}`,
                `**Status:** ${status[message.member.user.presence.status]}`,
                `**Game:** ${member.user.presence.game || 'Not playing a game'}`,
                `\u200b`
            ])
            .addField('Member', [
                `**Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
                `**Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
                `**Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
                `**Roles: [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? (roles) : 'None'}`,
                `\u200b`
            ])
            .setFooter(`Shiina | Developed by Souloutz#0038`)
            .setTimestamp();
        return message.channel.send(Info);
    }
};
