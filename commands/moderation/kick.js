const {MessageEmbed} = require('discord.js');
const colors = require('../../colors.json');

module.exports = {
    name: 'kick',
    category: 'moderation',
    description: 'Kick a specified user',
    usage: '<user> <reason>',
    run: async(bot, message, args) => {
        const permissions = message.member.hasPermission("KICK_MEMBERS");
        if(!permissions) return message.channel.send('You do not have the permission to execute this command!');
        
        if(!args[0]) return message.channel.send('Please specify a user to kick and the reason for the kick!');
        const member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        if(!member) return message.channel.send('That is not a user in the server! Try again!');
        
        if (member.id === message.author.id) {
            const Sorry = new MessageEmbed()
                .setTitle('Error!')
                .setDescription('You cannot kick yourself! Nice try!')
                .setColor(colors.red_dark)
            return message.channel.send(Sorry);
        }
        
        if(!member.kickable){ 
            const Sorry = new MessageEmbed()
                .setTitle('Error!')
                .setDescription('This user has a higher role, or equivalent roles to me!')
                .setColor(colors.red_dark)
            return message.channel.send(Sorry);
        }

        if(!args[1]) return message.channel.send('Please specify a reason!');
        const reason = args.slice(1, ).join(" ");
        if(!reason) return message.channel.send('Please specify a reason!');
        
        let name = bot.users.cache.get(member.id).tag;
        member.kick(member, {reason: reason});
        const Kick = new MessageEmbed()
            .setTitle('Bye!')
            .setDescription(`${message.author.username} has kicked the user ${name} from this server!\nID: ${member.id}\nReason: ${reason}`)
            .setColor(colors.gold)
        message.channel.send(Kick);
    }
}
