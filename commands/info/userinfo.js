const {MessageEmbed} = require("discord.js");
const colors = require("../../colors.json");
const moment = require('moment');
require('moment-duration-format');

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
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
        const userflags = member.user.flags.toArray();
        const Info = new MessageEmbed()
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512}))
            .setColor(colors.peach)
            .addField('User', [
                `**> Username:** ${member.user.username}`,
                `**> Discriminator:** ${member.user.discriminator}`,
                `**> ID:** ${member.id}`,
                `**> Flags:** ${userflags.length ? userflags.map(flag => flags[flags]).join(', ') : 'None'}`,
                `**> Avatar:** [Link to Avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
                `**> Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
                `**> Status:** ${member.user.presence.status}`,
                `**> Game:** ${member.user.presence.game || 'Not playing a game'}`,
                `\u200b`
            ])
            .addField('Member', [
                `**> Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
                `**> Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
                `**> Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
                `**> Roles: [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
                `\u200b`
            ]);
        return message.channel.send(Info);
    }
};
