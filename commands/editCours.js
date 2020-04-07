const Discord = require('discord.js');
const fs = require("fs");
const validURL = require("../validURL.js");

module.exports.run = async (bot, msg, args) =>{
    let mErr = "Veuillez bien tout préciser : `!math editCours <date> <contenu du cours>`.";

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

    if(args[1] && args[2]) { //si tous les arguments on été précisés, on peut traiter la demande
        let content = args.splice(2, args.length - 1);
        let k = 0; //un itérateur

        //traitement du content (mot par mot) pour éviter une intégration des url dans la réponse du bot
        for(let m in content) {
            if(validURL.run(content[m])) {
                content[m] = "<"+content[m]+">";
            }
        }

        //on checrche le cours en question
        for(i in bot.cours) {
            if(bot.cours[i].nom == args[1] && bot.cours[i].guild == msg.guild.id && bot.cours[i].channel == msg.channel.id) {
                //on écrase les données
                bot.cours[i] = {
                    guild: msg.guild.id,
                    contenu: content.join(" "),
                    nom: args[1],
                    channel: msg.channel.id
                };

                //on les sauvegarde
                fs.writeFile("./cours/cours.json", JSON.stringify(bot.cours, null, 4), err =>{
                    if(err) throw err;
                    msg.channel.send(`Nouveau contenu pour le cours du **${bot.cours[i].nom}** : *${content.join(" ")}*.`);
                });
                k+=1; //si un cours avec le bon nom a été trouvé
                break; //pas la peine de continuer, on a déjà modifié le cours demandé
            }
        }

        //message d'erreur si k = 0 car cela veut dire qu'aucun cours n'a été trouvé !
        if(k === 0) return msg.channel.send(`Pas de modificaton car il n'y a pas eu de cours le **${args[1]}** !`);
    }
    else {
        msg.channel.send(mErr);
    }
}

module.exports.help = {
    name: "editCours",
    desc: "`Permet de modifier un cours existant.\nEx : !math editCours <nom> <nouveau contenu du cours>`"
}