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
        const roles = message.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString());
        const members = message.guild.members.cache
        const channels = message.guild.channels.cache
        const emojis = message.guild.emojis.cache
        const regions = message.guild.region.cache
        const filterLevels = message.guild.explicitContentFilter.cache
        const verificationLevels = message.guild.verificationLevel.cache

        const Info = new MessageEmbed()
            .setDescription(`**Information for __${message.guild.name}__**`)
            .setColor(colors.peach)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField('General', [
                `**Name:** ${message.guild.name}`,
                `**ID:** ${message.guild.id}`,
                `**Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
                `**Region:** ${regions}}`,
                `**Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
                `**Explicit Filter:** ${filterLevels}`,
                `**Verification Level:** ${verificationLevels}`,
                `**Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`,
                `\u200b`
            ])
            .addField('Statistics', [
                `**Role Count:** ${roles.length}`,
                `**Emoji Count:** ${emojis.size}`,
                `**Member Count:** ${message.guild.memberCount}`,
                `**Humans:** ${message.guild.members.filter(member => !member.user.bot).size}`,
                `**Bots:** ${message.guild.members.filter(member => member.user.bot).size}`,
                `**Text Channels:** ${message.guild.channels.filter(channel => channel.type === 'text').size}`,
                `**Voice Channels:** ${message.guild.channels.filter(channel => channel.type === 'voice').size}`,
                `**Boost Count:** ${message.guild.permiumSubscriptionCount || '0'}`,
                `\u200b`
            ])
            .addField('Presence', [
                `**Online:** ${message.guild.members.filter(member => member.presence.status === 'online').size}`,
                `**Idle:** ${message.guild.members.filter(member => member.presence.status === 'idle').size}`,
                `**Do Not Disturb:** ${message.guild.members.filter(member => member.presence.status === 'dnd').size}`,
                `**Offline:** ${message.guild.members.filter(member => member.presence.status === 'offline').size}`
                `\u200b`
            ])
            .addField(`Roles [${roles.length} - 1]`, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None')
            .setFooter('Shiina | Developed by Souloutz#0038')
            .setTimestamp();
        return message.channel.send(Info);
    }
};


