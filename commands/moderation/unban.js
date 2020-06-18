const {MessageEmbed} = require('discord.js');
const colors = require('../../colors.json');

module.exports = {
    name: 'unban',
    category: 'moderation',
    description: 'Unbans a specified user',
    usage: '<user> [reason]',
    run: async(bot, message, args) => {
        let permissions = message.member.hasPermission("BAN_MEMBERS");
        if(!permissions) return message.channel.send('You do not have permission to execute this command!');
        
        if(!args[0]) return message.channel.send('Please provide a user id and the reason for the unban!');
        const member = await bot.users.fetch(args[0]);
        if(!member) return message.channel.send('Cannot find specified user! Please provide a valid user id!');
        
        const reason = args.slice(1, ).join(" ") || 'No reason given!';
        
        let name = bot.users.cache.get(member.id).tag;
        message.guild.members.unban(member, {reason: reason});
        const Unban = new MessageEmbed()
            .setTitle('Welcome back!')
            .setDescription(`${message.author.username} has unbanned the user ${name} from this server!\nID: ${member.id}\nReason: ${reason}`)
            .setColor(colors.green_dark)
        message.channel.send(Unban);
    }
}