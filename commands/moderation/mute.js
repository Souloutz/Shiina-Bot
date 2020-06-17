const {MessageEmbed} = require('discord.js');
const colors = require('../../colors.json');
const ms = require('ms');

module.exports = {
    name: 'mute',
    category: 'moderation',
    description: 'Mutes a user for a period of time',
    usage: '<user> <length> <reason>',
    run: async(bot, message, args) => {
        const permissions = message.member.hasPermission("MANAGE_ROLES");
        if(!permissions) return message.channel.send('You do not have permission to execute this command!');
        
        if(!args[0]) return message.channel.send('Please specify a user to mute, the length of time, and reason for mute!');
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.channel.send('That is not a valid user in the server! Try again!');

        if (member.id === message.author.id) {
            const Sorry = new MessageEmbed()
                .setTitle('Error!')
                .setDescription('You cannot mute yourself! Nice try!')
                .setColor(colors.red_dark)
            return message.channel.send(Sorry);
        }

        if(member.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.owner.id){ 
            const Sorry = new MessageEmbed()
                .setTitle('Error!')
                .setDescription('This user has a higher role, or equivalent roles to me!')
                .setColor(colors.red_dark)
            return message.channel.send(Sorry);
        }

        const time = args.slice(1, 2).join(" ");
        if(!time) return message.channel.send('Please specify a length of time!');
        

        const reason = args.slice(2, ).join(" ");
        if(!reason) return message.channel.send('Please specify the reason for the mute!')
        
        let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
        if(!muterole) {
        try {
            muterole = await message.guild.roles.create({
                data:  {
                name: "Muted",
                color: "#8e2430",
                permissions: []
            }
        });
        }   catch(e) {
                console.log(e.stack);
        }
    }
    await message.guild.channels.cache.forEach(async (channel, id) => {
      await channel.updateOverwrite(muterole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
        SEND_TTS_MESSAGES: false,
        ATTACH_FILES: false,
        SPEAK: false
    })
    });

    await member.roles.add(muterole.id, {reason: reason})
        const Mute = new MessageEmbed()
            .setTitle(`Mute!`)
            .setColor("#3291a8")
            .setDescription(`${message.author.username} has muted the user ${member.user.tag}!\nID: ${member.user.id}\nLength of Time: ${time}\nReason: ${reason}`)
        message.channel.send(Mute)

        setTimeout(function(){
            member.roles.remove(muterole.id, {reason: reason})
        }, ms(time));
    
    
    
    
    
    
    
    }
}