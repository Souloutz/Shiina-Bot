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
        const member = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || await bot.users.fetch(args[0]);
        if(member !== message.guild.members) return message.channel.send('That is not a valid user in the server! Try again!');
        if(member === member.user.bot) return message.channel.send('You can not send messages to bots!');


        if(!args[1]) return message.channel.send('Please supply a message!');
        const dmmessage = args.slice(1, ).join(" ");
        if(!dmmessage) return message.channel.send('Please supply a message!');

        member.send(`${dmmessage}`);
        message.channel.send('Message Sent!')

        async function Wait() {
            message.channel.bulkDelete(2);
        };

        setTimeout(Wait, 1500);
    }
}