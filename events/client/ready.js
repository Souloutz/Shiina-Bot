module.exports = bot => {
    bot.user.setActivity('s!help', {type: 'PLAYING'});
    console.log(`${bot.user.tag} is online!`)
};