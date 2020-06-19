module.exports = {
    name: 'dm',
    category: 'fun',
    description: 'Message a user with your message',
    usage: '<user> <message>',
    timout: 10000,
    run: async(bot, message, args) => {
        const permissions = message.member.hasPermission("MANAGE_MESSAGES");
        if(!permissions) return message.channel.send('You do not have permission to execute this command!');

        if(!args[0]) return message.channel.send('Please specify a user to message!');
        const members = message.guild.members.cache
        const bots = members.filter(member =>  member.user.bot)
        const user = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || await bot.users.fetch(args[0]);
        if(!user) return message.channel.send('That is not a user in the server! Try again!');
        if(user === bots) return message.channel.send('You can not send a message to a bot!');
        
        if(!args[1]) return message.channel.send('Please supply a message!');
        const dmmessage = args.slice(1, ).join(" ");
        if(!dmmessage) return message.channel.send('Please supply a message!');

        user.send(`${dmmessage}`);
        message.channel.send('Message Sent!')

        async function Wait() {
            message.channel.bulkDelete(2);
        };

        setTimeout(Wait, 1500);
    }
}