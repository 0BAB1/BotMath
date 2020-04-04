const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    let m = new Discord.Collection;
    let nom, alias, ID = new String;
    let k = 0;

    if(args[1] === "extractUsers") {
        if(!msg.member.hasPermission("ADMINISTRATOR")) {
            if(msg.deletable) {
                msg.delete({timeout:3000}); //supression du message
                msg.reply("Vous n'avez pas la permission d'effectuer cette action, supression du message dans 3 secondes !")
                    .then(b_msg => {b_msg.delete({timeout:3000});}); //supression de la réponse du bot
            } else {
                msg.reply("Vous n'avez pas la permission d'effectuer cette action !");
            }
        } else {
            m = msg.channel.members;

            for(const [memberID, member] of m) {
                //on cherche si le membre n'est pas déjà dans la base de données
                k = 0;
                for(let i in bot.utilisateurs) {
                    if(i == memberID || member.user.username == "math-bot") {
                        k++;
                        break;
                    }
                }
                //si c'est le cas, on ne l'enregistre pas à nouveau et on passe directement au membre suivant
                if(k>0) {
                    //console.log(`Utilisateur sauté : ${member.user.username}`);
                    continue;
                }

                nom = member.user.username
                alias = member.nickname;
                
                bot.utilisateurs[memberID] = {
                   nom: nom,
                   alias: alias,
                   message: "a_remplir"
               };
            }

            //on l'écrit dans le .json
            fs.writeFile("./cours/utilisateurs.json", JSON.stringify(bot.utilisateurs, null, 4), err =>{
                if(err) throw err;
                msg.channel.send("Extraction des membres du salon effectuée.");
            });
        }
    } else {
        nom = msg.author.id;
        if(bot.utilisateurs[nom]) {
            msg.author.send(bot.utilisateurs[nom].message);
        } else {
            msg.reply("Vous n'êtes recensé(e) dans la base des membres du serveur.");
        }
    }
}

module.exports.help = {
    name: "sendDM",
    desc: "`Permet d'envoyer un message privé prévu par l'administrateur du serveur.\nEx : !math sendDM`"
}