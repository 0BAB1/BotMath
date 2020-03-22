const Discord = require('discord.js');

module.exports.run = async (bot, msg, args) => {
    let message = await msg.channel.send('... génération du lien ...'); //des petis await qui ne servent pas c,'est des petits tests sympa pour faire
    //un impression de chargement

    if(!msg.author.displayAvatarURL()) return msg.edit("erreur");
    
    await message.edit(msg.author.displayAvatarURL());
}

module.exports.help = {
    name: "avatar",
    desc: "`affiche ton avatar.. en grand ...`"
}