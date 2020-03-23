const Discord = require('discord.js');

module.exports.run = async (bot, msg, args) => {
    if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("Vous n'avez pas la permission d'effectuer cette action !");
    if(!args[1]){
        let embed = new Discord.MessageEmbed()
            .setTitle("Aide sur les commandes.")
            .setColor('#0099ff')
            .setThumbnail("https://lambda.sx/Elp.gif")
            .setFooter("Pour plus d'informations, contacter @Hugo BABIN en TS4.")
            bot.commands.forEach(cmd => {//pour chaque commande dans le collection du bot
                embed.addField(`!math ${cmd.help.name}`,`${cmd.help.desc}`); //on ajoute un field avec les infos de module.exports.help
                embed.addField("------------------------------"); //separateur (une ligne suffit, sinon l'affichage prend trop de place)
            });
        
        msg.channel.send(embed);
    }
}

module.exports.help = {
    name: "help",
    desc: "`Pour demander de l'aide.`"
}
