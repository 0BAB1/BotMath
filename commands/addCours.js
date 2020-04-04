const Discord = require('discord.js');
const fs = require("fs");
const validURL = require("../validURL.js");

module.exports.run = async (bot, msg, args) =>{
    let stringAffichage = new String; //message à afficher, vide par défaut
    let k = 1; //pour compter le nombre d'entrées portant déjà le même nom, il y en a au moins une

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

    if(args[1] && args[2]) { //si tout les arguments sont renseignés
        let content = args.splice(2, args.length - 1);
        let timeId = Math.floor(Date.now()/1000);

        //traitement du content, mot par mot, pour éviter une intégration des url dans la réponse du bot
        for(let m in content){
            if(validURL.run(content[m])) { //if(validURL(content[m])) {
                content[m] = "<"+content[m]+">";
            }
        }

        //recherche d'une ou plusieurs entrées portant déjà le nom donné
        for(let i in bot.cours) {
            if(bot.cours[i].nom.startsWith(args[1]) && bot.cours[i].channel == msg.channel.id && bot.cours[i].guild == msg.guild.id){
                k ++;
            }
        }
        if(k>1) {
            args[1] = `${args[1]}-${k}`;
            stringAffichage = `Nom déja utilisé, j'ai modifié le nom en : **${args[1]}**.\n`; //on sauvegarde pour n'afficher qu'un seul futur message
        }

        //on definit le contenu du cours
        bot.cours[timeId] = { //on utilise le temps pour donner un Id à notre cours, de plus, on pourra les trier par ordre chrono dans dumpCours.js
            guild: msg.guild.id, //pour gérer plusieurs serveurs
            contenu: content.join(" "),
            nom: args[1],
            channel: msg.channel.id //on utilise le channel id, propre à chaque salon
        };

        //on l'écrit dans le .json
        fs.writeFile("./cours/cours.json", JSON.stringify(bot.cours, null, 4), err =>{
            if(err) throw err;
            stringAffichage += `Nouveau cours du **${args[1]}** : *${content.join(" ")}*.`;
            msg.channel.send(stringAffichage);
        });
    }
    else {
        msg.channel.send("Veuillez bien tout préciser (\"!math help\" pour plus d'infos) !");
    }
}

module.exports.help = {
    name: "addCours",
    desc: "`Permet d'ajouter un cours.\nEx : !math addCours <date> <contenu du cours>\nGardez une date simple, sans espace.\nCe cours ne serra accessible que depuis le salon ou il a été envoyé.`"
}