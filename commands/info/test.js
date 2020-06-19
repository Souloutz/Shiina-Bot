const { DiscordAPIError } = require("discord.js")

const {MessageEmbed} = require('discord.js');

module.exports = {
    run: async(bot, message, args) => {
        const roles = message.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);
        const test = new MessageEmbed()
            .addField(`**Roles: [${roles.length}]:**`, `${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? (roles) : 'None'}`)

        message.channel.send(test);
    }
}