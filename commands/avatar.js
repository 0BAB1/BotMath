const Discord = require('discord.js');

module.exports.run = async (bot, msg, args) => {
    let message = await msg.channel.send('... génération du lien ...');
    //des petits await qui ne servent pas, c'est des petits tests sympas
    //pour faire une impression de chargement...
    //morceau de code à garder car peut servir d'exemple

    if(!msg.author.displayAvatarURL()) return msg.edit("erreur");
    
    await message.edit(msg.author.displayAvatarURL());
}

module.exports.help = {
    name: "avatar",
    desc: "`Affiche ton avatar, en grand !`"
}