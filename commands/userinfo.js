const Discord = require('discord.js');

module.exports.run = async (bot, msg, args) => {
        let embed = new Discord.MessageEmbed()
            .setAuthor(msg.author.username)
            .setDescription("infos utilisateur")
            .setColor("#FF69B4")
            .setThumbnail(msg.author.displayAvatarURL())
            .addField("ID : ",`${msg.author.id}`)
            .addField("utilisateur :", `${msg.author.username}#${msg.author.discriminator}`);
        
        msg.channel.send({embed : embed});

        return;
}

module.exports.help = {
    name: "userinfo",
    desc: "`affiche vos info utilisateur pour vos mates !`"
}