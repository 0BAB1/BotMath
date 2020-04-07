const Discord = require('discord.js');
const fs = require("fs");
const validURL = require("../validURL.js");

module.exports.run = async (bot, msg, args) =>{
    let mErr = "Veuillez bien tout préciser : `!math editDevoir <date> <contenu du cours>`.";

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

    if(args[1] && args[2]) { //si tout les arguments on été précisés, n peut traiter la demande
        let content = args.splice(2, args.length - 1);
        let k = 0; //un iterateur

        //traitement du content (mot par mot) pour éviter une intégration des url dans la réponse du bot
        for(let m in content) {
            if(validURL.run(content[m])) {
                content[m] = "<"+content[m]+">";
            }
        }

        //on cherche le devoir en question
        for(i in bot.devoirs) {
            if(bot.devoirs[i].nom == args[1] && bot.devoirs[i].guild == msg.guild.id && bot.devoirs[i].channel == msg.channel.id) {
                //on écrase les données
                bot.devoirs[i] = {
                    guild: msg.guild.id,
                    contenu: content.join(" "),
                    nom: args[1],
                    channel: msg.channel.id
                };

                //on les sauvegarde
                fs.writeFile("./cours/devoirs.json", JSON.stringify(bot.devoirs, null, 4), err =>{
                    if(err) throw err;
                    msg.channel.send(`Nouveau contenu du devoir pour le **${bot.devoirs[i].nom}** : *${content.join(" ")}*.`);
                });
                k+=1; //si un devoir avec le bon nom a été trouvé
                break; //pas la peine de continuer, on a déjà modifié le devoir demandé
            }
        }

        //message d'erreur si k = 0 car cela veut dire qu'aucun devoir n'a été trouvé !
        if(k === 0) return msg.channel.send(`Pas de modificaton car il n'y a pas de devoir pour le **${args[1]}** !`);
    }
    else {
        msg.channel.send(mErr);
    }
}

module.exports.help = {
    name: "editDevoir",
    desc: "`Permet de modifier un devoir existant.\nEx : !math editDevoir <nom> <nouveau contenu du devoir>`"
}