const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    if(!msg.member.hasPermission("ADMINISTRATOR")) {
        if(msg.deletable) {
            msg.delete({timeout:3000}); //supression du message
            msg.reply("Vous n'avez pas la permission d'effectuer cette action, supression du message dans 3 secondes !")
                .then(b_msg => {b_msg.delete({timeout:3000});}); //supression de la réponse du bot
        } else {
            msg.reply("Vous n'avez pas la permission d'effectuer cette action !");
        }

        return
    }

    if(args[1] && args[2])//si tout les arguments on été précisés, n peut traiter la demande
    {
        let content = args.splice(2, args.length - 1);
        let k = 0; //un iterateur

        for(i in bot.devoirs)
        {
            if(bot.devoirs[i].nom == args[1] && bot.devoirs[i].guild == msg.guild.id && bot.devoirs[i].channel == msg.channel.id)
            {
                bot.devoirs[i] = { //on écrase les données
                    guild: msg.guild.id,
                    contenu: content,
                    nom: args[1],
                    channel: msg.channel.id
                };

                fs.writeFile("./cours/devoirs.json", JSON.stringify(bot.devoirs, null, 4), err =>{ //on les sauvegarde
                    if(err) throw err;
                    msg.channel.send(`Nouveau contenu du devoir pour le **${bot.devoirs[i].nom}** : *${content.join(" ")}*`);
                });
                k+=1; //si ca trouve un cours avec le bon nom
                break; //pas la peine de continuer, on a déjà modifié un devoir
            }
        } // on retouve le devoir en question

        // message d'erreur si k = 0 car ca veut dire que acun msg n'a été trouvé !
        if(k === 0) return msg.channel.send(`Pas de modificaton car il n'y a pas de devoir pour le **${args[1]}**`);

        return;
    }
    else
    {
        msg.channel.send("Veuillez bien tout préciser : `!math editDevoir <date> <contenu du cours>`.");
    }
}

module.exports.help = {
    name: "editDevoir",
    desc: "`Permet de modifier un devoir existant.\nEx : !math editDevoir <nom> <nouveau contenu du devoir>`"
}