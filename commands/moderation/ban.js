const {MessageEmbed} = require('discord.js');
const colors = require('../../colors.json');

module.exports = {
    name: 'ban',
    category: 'moderation',
    description: 'Ban a specified user',
    usage: '<user> <reason>',
    run: async(bot, message, args) => {
        const permissions = message.member.hasPermission("BAN_MEMBERS");
        if(!permissions) return message.channel.send('You do not have permission to execute this command!');
        
        if(!args[0]) return message.channel.send('Please specify a user to ban and the reason for the ban!');
        const member = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || await bot.users.fetch(args[0]);
        if(!member) return message.channel.send('That is not a user in the server! Try again!');
        
        if (member.id === message.author.id) {
            const Sorry = new MessageEmbed()
                .setTitle('Error!')
                .setDescription('You cannot ban yourself! Nice try!')
                .setColor(colors.red_dark)
            return message.channel.send(Sorry);
        }

        if(!member.bannable){ 
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
        message.guild.members.ban(member, {reason: reason});
        const Ban = new MessageEmbed()
            .setTitle('Ban Hammer!')
            .setDescription(`${message.author.username} has banned the user ${name} from the server!\nID: ${member.id}\nReason: ${reason}`)
            .setColor(colors.green_dark)
        message.channel.send(Ban);
    }
}