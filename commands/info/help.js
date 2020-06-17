const {MessageEmbed} = require('discord.js');
const {stripIndents} = require('common-tags');
const colors = require('../../colors.json');
const ms = require('ms');

module.exports = {
    name: 'help',
    category: 'info',
    description: 'Displays the bot\'s commands',
    usage: '[command]',
    timout: 5000,
    run: async(bot, message, args) => {
        if(args[0]) {
            return getCMD(bot, message, args[0]);
        } else {
            return getAll(bot, message);
        }
                
    }
}

function getAll(bot, message) {
    const helpAll = new MessageEmbed()
        .setColor(colors.blue_light)

    const commands = (category) => {
        return bot.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `- \`${cmd.name}\``)
            .join(" ");
    }

    const info = bot.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + '\n\n' + category);

        helpAll.setTitle('Command List')
        helpAll.setDescription(info)
        helpAll.setFooter('Use the command s!help [role] to get more information about a role!')
    
    return message.channel.send(helpAll);
}

function getCMD(bot, message, input) {
    const helpCMD = new MessageEmbed()

    const cmd = bot.commands.get(input.toLowerCase()) || bot.commands.get(bot.aliases.get(input.toLowerCase()));

    let info = `No information found for the command **${input.toLowerCase()}**`;

    if (!cmd) {
        helpCMD.setColor(colors.blue_light)
        helpCMD.setDescription(info)
        return message.channel.send(helpCMD);
    }

    if (cmd.name) info = `**Command Name**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Usage**: ${cmd.usage}`;
        helpCMD.setFooter(`Syntax: <> = required, [] = optional`);
    }
    if(cmd.timeout) info += '\n**Cooldown**: '+ms(cmd.timeout)

    helpCMD.setColor(colors.blue_light)
    helpCMD.setDescription(info)
    return message.channel.send(helpCMD);
}