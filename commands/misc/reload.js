const {readdirSync} = require('fs');
const {join} = require("path");
const {ownerID} = require('../../config.json');


module.exports = {
    name: 'reload',
    category: 'misc',
    description: 'Reloads a command',
    usage: 'Only accessible by the developer',
    run: async(bot, message, args) => {
        if(message.author.id !== ownerID) return message.channel.send('You do not have permission to access this command!');
        if(!args[0]) return message.channel.send('Please specify a command to reload!');

        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
	        || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return message.channel.send(`There is no command with the name or alias \`${commandName}\`!`);
        readdirSync(join(__dirname, "..")).forEach(f => {
            const files = readdirSync(join(__dirname, "..", f));
            if(files.includes(`${commandName}.js`)) {
                const file = (`../${f}/${commandName}.js`);
                try {
                    delete require.cache[require.resolve(file)];
                    bot.commands.delete(commandName);
                    const pull = require(file);
                    bot.commands.set(commandName, pull);
                } catch (error) {
                    console.log(error);
                    message.channel.send(`Could not reload: \`${command.name}\`\nError: \`${error.message}\``);
                }
                message.channel.send(`The command \`${command.name}\` has been reloaded!`);
            }
        })
    }
}