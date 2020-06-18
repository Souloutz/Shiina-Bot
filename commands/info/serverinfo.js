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
                `**Humans:** ${(!message.guild.members.user.bot).size}`,
                `**Bots:** ${(message.guild.members.user.bot).size}`,
                `**Text Channels:** ${(message.guild.channels.type === 'text').size}`,
                `**Voice Channels:** ${(message.guild.channels.type === 'voice').size}`,
                `**Boost Count:** ${message.guild.permiumSubscriptionCount || '0'}`,
                `\u200b`
            ])
            .addField('Presence', [
                `**Online:** ${(message.guild.members.presence.status === 'online').size}`,
                `**Idle:** ${(message.guild.members.presence.status === 'idle').size}`,
                `**Do Not Disturb:** ${(message.guild.members.presence.status === 'dnd').size}`,
                `**Offline:** ${(message.guild.members.presence.status === 'offline').size}`
                `\u200b`
            ])
            .addField(`Roles [${roles.length} - 1]`, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None')
            .setFooter('Shiina | Developed by Souloutz#0038')
            .setTimestamp();
        return message.channel.send(Info);
    }
};


