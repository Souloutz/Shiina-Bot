const Discord = require('discord.js');
const { prefix } = require('../config.json');
const { readdirSync } = require("fs");
const bot = new Discord.Client();

bot.aliases = new Discord.Collection();

module.exports = (bot) => {
    readdirSync("./commands/").map(dir => {
       const commands = readdirSync(`./commands/${dir}/`).map(cmd=>{
           let pull = require(`../commands/${dir}/${cmd}`)
           console.log(`Loaded command ${prefix}${pull.name}`)
           bot.commands.set(pull.name,pull)
           if(cmd.aliases){
               cmd.aliases.forEach(p=>{
                   bot.aliases.set(p,pull)
               })
           }
       })
    })
}