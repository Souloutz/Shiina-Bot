const Discord = require('discord.js');
const colors = require('../../colors.json');
const bot = new Discord.Client();

module.exports = {
    name: 'avatar',
    category: 'info',
    description: 'Displays avatar',
    usage: '[user]',
    run: async(bot, message, args) => {
        function getUserFromMention(mention) {
            if (!mention) return;
        
            if (mention.startsWith('<@') && mention.endsWith('>')) {
                mention = mention.slice(2, -1);
        
                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }
        
                return bot.users.cache.get(mention);
            }
        }
        
        if(args[0]){
        
            const user = getUserFromMention(args[0]);
        
            if(!user){
                const Sorry = new Discord.MessageEmbed()
                .setColor(colors.red_light)
                .setDescription(`Sorry, couldn't find that user... Try again!`)
                return message.channel.send(Sorry);
            }
        
            const Avatar = new Discord.MessageEmbed()
            .setColor(colors.black)
            .setAuthor(`${user.tag}`, user.displayAvatarURL())
            .setTitle('Avatar')
            .setImage(user.displayAvatarURL())
            return message.channel.send(Avatar);
        }
        
        const user = message.author;
        const Avatar = new Discord.MessageEmbed()
        .setColor(colors.black)
        .setAuthor(`${user.tag}`, user.displayAvatarURL())
        .setTitle('Avatar')
        .setImage(user.displayAvatarURL())
        return message.channel.send(Avatar);
    }
};
