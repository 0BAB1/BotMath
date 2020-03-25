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

    if(args[1] && args[2])//si tous les arguments on été précisés, on peut traiter la demande
    {
        let content = args.splice(2, args.length - 1);
        let k = 0; //un itérateur

        for(i in bot.cours)
        {
            if(bot.cours[i].nom == args[1] && bot.cours[i].guild == msg.guild.id && bot.cours[i].channel == msg.channel.id)
            {
                bot.cours[i] = { //on écrase les données
                    guild: msg.guild.id,
                    contenu: content,
                    nom: args[1],
                    channel: msg.channel.id
                };

                fs.writeFile("./cours/cours.json", JSON.stringify(bot.cours, null, 4), err =>{ //on les sauvegarde
                    if(err) throw err;
                    msg.channel.send(`Nouveau contenu pour le cours du **${bot.cours[i].nom}** : *${content.join(" ")}*`);
                });
                k+=1; //si ca trouve un cours avec le bon nom
                break; //pas la peine de continuer, on a déjà modifié un cours
            }
        } // on retouve le cours en question

        // message d'erreur si k = 0 car ca veut dire que acun msg n'a été trouvé !
        if(k === 0) return msg.channel.send(`Pas de modificaton car il n'y a pas eu de cours le **${args[1]}** !`);

        return;
    }
    else
    {
        msg.channel.send("Veuillez bien tout préciser : `!math editCours <date> <contenu du cours>`.");
    }
}

module.exports.help = {
    name: "editCours",
    desc: "`Permet de modifier un cours existant.\nEx : !math editCours <nom> <nouveau contenu du cours>`"
}