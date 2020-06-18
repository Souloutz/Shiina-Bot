const {MessageEmbed} = require('discord.js');
const colors = require('../../colors.json');

module.exports = {
    name: 'unmute',
    category: 'moderation',
    description: 'Unmute a specified user',
    usage: '<user> [reason]',
    run: async(bot, message, args) => {
        const permissions = message.member.hasPermission("MANAGE_ROLES");
        if(!permissions) return message.channel.send('You do not have permission to execute this command!');

        if(!args[0]) return message.channel.send('Please specify a user and the reason for the unmute!')
        const member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if(!member) return message.channel.send('That is not a valid user in the server! Try again!');

        if(member.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.owner.id){ 
            const Sorry = new MessageEmbed()
                .setTitle('Error!')
                .setDescription('This user has a higher role, or equivalent roles to me!')
                .setColor(colors.red_dark)
            return message.channel.send(Sorry);
        }

        const reason = args.slice(1, ).join(" ") || 'No reason provided!';

        let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
        await member.roles.remove(muterole.id, {reason: reason})
            const Unmute = new MessageEmbed()
                .setTitle('Unmute!')
                .setColor('#3291a8')
                .setDescription(`${message.author.username} has unmuted the user ${member.user.tag}!\nID: ${member.id}\nReason: ${reason}`)
            message.channel.send(Unmute);
    }
}