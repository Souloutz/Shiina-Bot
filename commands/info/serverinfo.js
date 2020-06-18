const {MessageEmbed} = require("discord.js");
const colors = require("../../colors.json");
const moment = require('moment');
require('moment-duration-format');

const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone'
};
const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};
const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydney: 'Sydney',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South'
};

module.exports = {
    name:'serverinfo',
    category:'info',
    description: 'Displays server info',
    aliases: ['server'],
    run: async(bot, message, args) => {
        const roles = message.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString());
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const emojis = message.guild.emojis.cache;

        const Info = new MessageEmbed()
            .setDescription(`**Information for __${message.guild.name}__**`)
            .setColor(colors.peach)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField('General', [
                `**Name:** ${message.guild.name}`,
                `**ID:** ${message.guild.id}`,
                `**Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
                `**Region:** ${regions[message.guild.region]}`,
                `**Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
                `**Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
                `**Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
                `**Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`,
                `\u200b`
            ])
            .addField('Statistics', [
                `**Role Count:** ${roles.length}`,
                `**Emoji Count:** ${emojis.size}`,
                `**Member Count:** ${message.guild.memberCount}`,
                `**Humans:** ${members.get(member => !member.user.bot).toString()}`,
                `**Bots:** ${members.get(member => member.user.bot).toString()}`,
                `**Text Channels:** ${channels.get(channel => channel.type === 'text').toString()}`,
                `**Voice Channels:** ${channels.get(channel => channel.type === 'voice').toString()}`,
                `**Boost Count:** ${message.guild.permiumSubscriptionCount || '0'}`,
                `\u200b`
            ])
            .addField('Presence', [
                `**Online:** ${members.get(member => member.presence.status === 'online').toString()}`,
                `**Idle:** ${members.get(member => member.presence.status === 'idle').toString()}`,
                `**Do Not Disturb:** ${members.get(member => member.presence.status === 'dnd').toString()}`,
                `**Offline:** ${members.get(member => member.presence.status === 'offline').toString()}`
                `\u200b`
            ])
            .addField(`Roles [${roles.length} - 1]`, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None')
            .setFooter('Shiina | Developed by Souloutz#0038')
            .setTimestamp();
        return message.channel.send(Info);
    }
};


