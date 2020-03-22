const Discord = require('discord.js');

module.exports.run = async (bot, msg, args) => {
    if(!args[1]){
        let embed = new Discord.MessageEmbed()
            .setTitle("help sur les commandes")
            .setColor('#0099ff')
            .setThumbnail("https://lambda.sx/Elp.gif")
            .setFooter("contacter @hugo BABIN TS4 pour + d'infos")
            bot.commands.forEach(cmd => {//pour chaque commande dans le collection du bot
                embed.addField(`!SI ${cmd.help.name}`,`${cmd.help.desc}`) //on ajoute un field avec les infos de module.exports.help
            });
        
        msg.channel.send(embed);
    }
}

module.exports.help = {
    name: "help",
    desc: "`ici pour aider`"
}