const {MessageEmbed} = require('discord.js');
const {prefix} = require('../../config.json');
const colors = require('../../colors.json');

module.exports = {
    name: 'poll',
    category: 'fun',
    description: 'Create a simple poll',
    usage: '<yes/no question>',
    run: async(bot, message, args) => {
        const permissions = message.member.hasPermission("MANAGE_CHANNELS", "ADMINISTRATOR");
        if(!permissions) return message.channel.send('You do not have permission to execute this command!');
        
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if(!channel){
            return message.channel.send('Please specify a channel for the poll and the question!');
        }
        
        let question = message.content.slice(bot.prefix.length + 5 + channel.id.length + 3);
        if(!question){
            return message.channel.send('Please specify a quesion!');
        }
        const Poll = new MessageEmbed()
            .setColor(colors.blue_light)
            .setTitle(question)
            .addFields(
                {name:'✅', value: `Yes`},
                {name: '❎', value: `No`}
            )
        let msg = await bot.channels.cache.get(channel.id).send(Poll);
        await msg.react('✅');
        await msg.react('❎');
    
    
    }
}