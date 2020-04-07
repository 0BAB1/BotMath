const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    let channelMembers = new Discord.Collection;
    let excluded_users = ["math-bot", "Mme LEGRAS", "Mme Nadin", "colin.mrozinski", "M. MARQUENET", "Mme RABERIN", "M. MAZAT"];
    let nom, alias, mID, aff = new String;
    let dfltKey = "default_key", dfltTxt = "default_txt";
    let n_add = 0, k_add = false;

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
            channelMembers = msg.channel.members;

            for(const [memberID, member] of channelMembers) {
                //si l'utilisateur fait partie de la liste des utilisateurs exclus, on passe directement à l'utilisateur suivant
                if(excluded_users.includes(member.user.username)){
                    //console.log(`${member.user.username} fait partie des utilisateurs exclus.`);
                    continue;
                }
                //si l'utilisateur est déjà dans la base de donnée et avec une clef de messages déjà existante, on passe à l'utilisateur suivant
                if(bot.utilisateurs[memberID] && bot.utilisateurs[memberID].messages[args[2]]) {
                    continue;
                }

                /*
                //version lourde du test précédent mais qui fonctionne : à garder pour l'instant, supprimer si l'autre est bien stable
                k = 0;
                for(let i in bot.utilisateurs) {
                    if(i == memberID && bot.utilisateurs[i].messages[args[2]]) {
                        k++;
                        break;
                    }
                }
                if(k>0) {
                    continue;
                }
                */
                
                //si l'utilisateur est déjà dans la base de données, on rajoute une clef à la clef messages
                //mais à condition que args[2] existe (clef précisée dans la commande)
                if(bot.utilisateurs[memberID]) {
                    //console.log(`${member.user.username} est déjà dans la BDD.`);
                    if(args[2]) {
                        //console.log(`Rajout de ${args[2]} en tant que clef de la clef messages.`);
                        bot.utilisateurs[memberID].messages[args[2]] = `${dfltTxt}`;
                        dfltKey = args[2];
                        k_add = true;
                    }
                }
                //s'il l'utilisateur n'est pas dans la base de données, on l'ajoute
                else {
                    nom = member.user.username;
                    alias = member.nickname;
                    if(args[2]){ //si de plus la nouvelle clef a été précisée en args[2], on la prend en compte
                        dfltKey = args[2];
                        k_add = true;
                    }

                    bot.utilisateurs[memberID] = {
                        nom: nom,
                        alias: alias,
                        messages: JSON.parse(`{\"${dfltKey}\": \"${dfltTxt}\"}`)
                   };
                   n_add ++;
                }
            }

            //on l'écrit dans le .json
            fs.writeFile("./cours/utilisateurs.json", JSON.stringify(bot.utilisateurs, null, 4), err =>{
                if(err) throw err;

                if(n_add===0) {
                    aff = `Extraction des membres du salon effectuée (aucun nouvel utilisateur ajouté à la base de données).`;
                }else if(n_add===1) {
                    aff = `Extraction des membres du salon effectuée (1 nouvel utilisateur ajouté à la base de données).`;
                } else {
                    aff = `Extraction des membres du salon effectuée (${n_add} nouveaux utilisateurs ajoutés à la base de données).`;
                }

                aff += k_add ? `\nNouvelle clef **${dfltKey}** ajoutée aux messages disponibles.` : `\nAucun nouvelle clef ajoutée aux messages disponibles.`;
                /*
                if(k_add) {
                    aff += `\nNouvelle clef ${dfltKey} ajoutée aux messages disponibles.`;
                } else {
                    aff += `\nAucun nouvelle clef ajoutée aux messages disponibles.`;
                }*/

                msg.channel.send(aff);
            });
        }
    } else {
        mID = msg.author.id;
        if(bot.utilisateurs[mID]) {
            if(args[1]) {
                if(bot.utilisateurs[mID].messages[args[1]]) {
                    msg.author.send(`Message concernant **${args[1]}** : ${bot.utilisateurs[mID].messages[args[1]]}`);
                } else {
                    msg.author.send(`Aucun message concernant **${args[1]}** n'est à porter à votre attention.`);
                }
            } else {
                for(const i in bot.utilisateurs[mID].messages) {
                    aff += `Message concernant **${i}** : ${bot.utilisateurs[mID].messages[i]}\n`;
                }
                msg.author.send(aff);
            }
            
        } else {
            msg.author.send("Aucun message n'est à porter à votre attention.");
        }
    }
}

module.exports.help = {
    name: "sendDM",
    desc: "`Permet d'envoyer un message privé prévu par l'administrateur du serveur.\nEx : !math sendDM`"
}