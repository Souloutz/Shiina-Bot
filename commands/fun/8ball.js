const {MessageEmbed} = require('discord.js');
const colors = require('../../colors.json');

module.exports = {
    name: '8ball',
    category: 'fun',
    description: 'Tells you answers!',
    run: async(bot, message, args) => {
        let question = message.content.slice(bot.prefix.length + 6);
        if (!question) {
            return message.reply('Please specify a question');
        } else {
            let responses = [
                'It is certain.',
                'It is decidedly so.',
                'Without a doubt.',
                'Yes - definitely.',
                'You may rely on it.',
                'As I see it, yes.',
                'Most likely.',
                'Outlook good.',
                'Yes.',
                'Signs point to yes.',
                'Ask again later.',
                'Better not to tell you now.',
                'I don\'t know.',
                'Don\'t count on it.',
                'No.',
                'Very doubtful.',
                'Outlook not so good.',
                'Concentrate and ask again.',
                'Cannot predict now.'
            ]

            let Response = responses[Math.floor(Math.random()*(responses.length)- 1)];
            const Rolling = await message.channel.send('🎱|Rolling...');

            async function Wait() {
                Rolling.edit('🎱| ' + Response);
            };
    
            setTimeout(Wait, 2000);
        }
    }
}
