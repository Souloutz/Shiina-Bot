module.exports = bot => {
    bot.user.setActivity('s!help | Finally hosted 24/7', {type: 'PLAYING'});
    console.log(`${bot.user.tag} is online!`)
};