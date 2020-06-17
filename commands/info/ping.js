const Discord = require('discord.js');
const colors = require('../../colors.json');

module.exports = {
    name: 'ping',
    category: 'info',
    description: 'Returns latency and API ping',
    timeout: 10000,
    run: async(bot, message, args) => {
        const msg = await message.channel.send(':hourglass: Pinging...');
        var ping = msg.createdTimestamp - message.createdTimestamp;
        var botPing = Math.round(bot.ws.ping);
        const Ping = new Discord.MessageEmbed()
            .setColor(colors.aqua)
            .setTitle('Pong!')
            .addFields(
                {name: 'Ping: ', value: `${ping} ms`},
                {name: 'Latency: ', value: `${botPing} ms`}
            )
            .setTimestamp()
        async function Wait() {
            msg.delete();
            await message.channel.send(Ping);
        };

        setTimeout(Wait, 1500);
    }
};
