module.exports = {
    name: 'purge',
    category: 'moderation',
    description: 'Purge messages',
    usage: '<number>',
    timeout: 2500,
    run: async(bot, message, args) => {
        const permissions = message.member.hasPermission("MANAGE_MESSAGES");
        if(!permissions) return message.channel.send('You do not have permission to execute this command!');

        if(!args[0]) return message.channel.send('Please specify a number of messages to delete!');
        args[0].slice(1, );
        let amount = args.join(' ');

        if (isNaN(amount)) return message.channel.send('The amount parameter is not a number!'); 

        if (amount > 100) return message.channel.send('You can\'t delete more than 100 messages at once!'); 
        if (amount < 1) return message.channel.send('You have to delete at least 1 message!');

        await message.channel.messages.fetch({ limit : amount }).then(messages => { // Fetches the messages
            message.channel.bulkDelete(1);
            message.channel.bulkDelete(messages);
        });
    }
}