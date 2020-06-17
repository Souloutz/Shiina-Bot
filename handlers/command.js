const { prefix } = require('../config.json');
const { readdirSync } = require("fs");

module.exports = (bot) => {
    readdirSync("./commands/").map(dir => {
        const commands = readdirSync(`./commands/${dir}/`).map(cmd=>{
            let pull = require(`../commands/${dir}/${cmd}`)
            console.log(`Loaded command ${prefix}${pull.name}`)
            bot.commands.set(pull.name,pull)
            pull = require(`./commands/${dir}/${f}`);
            bot.commands.set(pull.name, pull);  
            pull.aliases.forEach(alias => {
                bot.aliases.set(alias, pull.name)
            })          
        })
    })
}