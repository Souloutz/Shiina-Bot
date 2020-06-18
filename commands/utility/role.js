const {MessageEmbed} = require('discord.js');
const {prefix} = require('../../config.json');
const colors = require('../../colors.json');

module.exports = {
    name: 'role',
    category: 'utility',
    description: 'Create and delete customizable roles',
    usage: '\n<create> <name> <color> \n<delete> <name>\n<add> <user> <role>\n<remove> <user> <role>',
    run: async(bot, message, args) => {
        const permissions = message.member.hasPermission("MANAGE_ROLES");
        if(!permissions) return message.channel.send('You do not have permission to execute this command!');

        if(!args[0]) return message.channel.send('Please specify whether to create, delete, add, or remove a role!')
        if(args[0].toLowerCase() === 'create'){
            let roleName = message.content.split(`${bot.prefix}role create `).join("");
            let roleColor;
            args.forEach(arg => {
                let start = arg[0].startsWith('#');
                if(start){
                    roleColor = arg
                }
            })
            if(!roleName){
                return message.channel.send('Please specify a name for the role!');
            }
            if(!roleColor){
                return message.channel.send('Please specify a hex code for the color of the role!');
            }
            if(roleColor>=16777215) return message.channel.send('That hex color range was too big!');
            if(roleColor<=0) return message.channel.send('That hex color range was too small!');
            roleName = roleName.replace(`${roleColor}`, ``);
            let roleNew = await message.guild.roles.create({
                data:{
                    name: roleName,
                    color: roleColor
                }
            })

            const newRole = new MessageEmbed()
                .setTitle('New Role!')
                .setDescription(`${message.author.username} has created the role ${roleName}\nHex Color Code: ${roleColor}\nRole ID: ${roleNew.id}`)
                .setColor(roleColor)
            message.channel.send(newRole);

        } else if (args[0].toLowerCase() === 'delete'){

            let roleDelete = message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => r.name == args[1]) || message.mentions.roles.first();
            if(!roleDelete) return message.channel.send('Please specify a role to delete!');
            roleDelete.delete();
            
            const deleteRole = new MessageEmbed()
                .setTitle('Deleted Role!')
                .setColor(roleDelete.color)
                .setDescription(`${message.author.username} has deleted the role ${roleDelete.name}\nHex Color Code: ${roleDelete.color}\nRole ID: ${roleDelete.id}`)
            message.channel.send(deleteRole);

        } else if (args[0].toLowerCase() === 'add'){

            if(!args[1]) return message.channel.send('Please specify a user to give the role to!');
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
            if(!member) return message.channel.send('That is not a valid user in the server! Try again!');

            if(!args[2]) return message.channel.send('Please specify a role to give the user!');
            const roleAdd = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
            if(!roleAdd) return message.channel.send('That is not a valid role in the server! Try again!');
            const check = roleAdd.comparePositionTo(message.member.roles.highest);
            if(check >= 0 && message.author.id !== message.guild.owner.id){
                const Sorry = new MessageEmbed()
                    .setTitle('Discord API Error!')
                    .setColor(colors.red_dark)
                    .setDescription('Missing Permissions...\nThe role is higher or equivalent to mine!')
                return message.channel.send(Sorry);
            }

            member.roles.add(roleAdd).catch(console.error);

            const addedRole = new MessageEmbed()
                .setTitle('Added Role!')
                .setColor(colors.green_light)
                .setDescription(`${message.author.username} has given the role ${roleAdd.name} to user ${member.user.tag}!\nRole ID: ${roleAdd.id}`)
            message.channel.send(addedRole);

        } else if (args[0].toLowerCase() === 'remove'){

            if(!args[1]) return message.channel.send('Please specify a user to remove the role from!');
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
            if(!member) return message.channel.send('That is not a valid user in the server! Try again!');

            if(!args[2]) return message.channel.send('Please specify a role to remove the user from!');
            const roleRemove = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
            if(!roleRemove) return message.channel.send('That is not a valid role in the server! Try again!');
            const check = roleRemove.comparePositionTo(message.member.roles.highest);
            if(check >= 0 && message.author.id !== message.guild.owner.id){
                const Sorry = new MessageEmbed()
                    .setTitle('Discord API Error!')
                    .setColor(colors.red_dark)
                    .setDescription('Missing Permissions...\nThe role is higher or equivalent to mine!')
                return message.channel.send(Sorry);
            }

            member.roles.remove(roleRemove).catch(console.error);

            const removedRole = new MessageEmbed()
                .setTitle('Removed Role!')
                .setColor(colors.green_light)
                .setDescription(`${message.author.username} has removed the role ${roleRemove.name} from user ${member.user.tag}!\nRole ID: ${roleRemove.id}`)
            message.channel.send(removedRole);
        }
    }
}