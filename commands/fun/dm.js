const {ownerID} = require('../../config.json');

module.exports = {
    name: 'dm',
    category: 'fun',
    description: 'Message a user with your message',
    usage: '<user> <message>',
    run: async(bot, message, args) => {
        const permissions = message.member.hasPermission("MANAGE_MESSAGES");
        if(!permissions) return message.channel.send('You do not have permission to execute this command!');

        if(!args[0]) return message.channel.send('Please specify a user to message!');
        const member = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || bot.users.fetch(args[0]);
        console.log(member);
        if(isNaN(member)) return message.channel.send('That is not a valid user!');
        if(!member) return message.channel.send('That is not a user in the server!');

        if(!args[1]) return message.channel.send('Please supply a message!');
        const dmmessage = args.slice(1, ).join(" ");
        if(!dmmessage) return message.channel.send('Please supply a message!');

        try {
            user.send(`${dmmessage}`);
            message.channel.send('Message Sent!')

            async function Wait() {
                message.channel.bulkDelete(2);
            };
    
            setTimeout(Wait, 1500);
        } catch {
            message.channel.send('There was an error sending the message! Please make sure that the user is correct is and is not a bot!');
            
            async function Wait() {
                message.channel.bulkDelete(2);
            }

            setTimeout(Wait, 10000);
        }
    }
}