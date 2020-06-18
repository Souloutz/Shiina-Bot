const {MessageEmbed} = require("discord.js");
const colors = require("../../colors.json");
const moment = require('moment');
require('moment-duration-format');


module.exports = {
    name: 'userinfo',
    category: 'info',
    description: 'Displays user info',
    usage: '[user]',
    aliases: ["user"],
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

            const User = getUserFromMention(args[0]);

            if(!User){
                const Sorry = new MessageEmbed()
                .setColor(colors.red_light)
                .setDescription(`Sorry, couldn't find that user... Try again!`)
                return message.channel.send(Sorry);
            }
            
            const info = new MessageEmbed()
                .setColor(colors.peach)
                .setAuthor(User.tag, User.displayAvatarURL())
                .setThumbnail(User.displayAvatarURL())
                .addField('Username', User.username, true)
                .addField('Discriminator', User.discriminator, true)            
                .addField('Status', User.presence.status, true)
                .addField('ID', User.id, true)
                .addField('Joined', moment.utc(User.joinedAt).format('ddd, MMMM Do, YYYY, hh:mm:ss A'))
                .addField('Registered', moment.utc(User.createdAt).format('ddd, MMMM Do, YYYY, hh:mm:ss A'))
                .setFooter('Shiina || Created by Souloutz#0038')
            return message.channel.send(info);
    
        }
            
        let User = message.author;
        const info = new MessageEmbed()
            .setColor(colors.peach)
            .setAuthor(User.tag, User.displayAvatarURL())
            .setThumbnail(User.displayAvatarURL())
            .addField('Username', User.username, true)
            .addField('Discriminator', User.discriminator, true)            
            .addField('Status', User.presence.status, true)
            .addField('ID', User.id, true)
            .addField('Roles', `<@&${User.member.roles.cache.join('> <@&')}>`)
            .addField('Joined', moment.utc(message.member.joinedAt).format('ddd, MMMM Do, YYYY, hh:mm:ss A'))
            .addField('Registered', moment.utc(message.author.createdAt).format('ddd, MMMM Do, YYYY, hh:mm:ss A'))
            .setFooter('Shiina || Created by Souloutz#0038')
        return message.channel.send(info);
    }
};
