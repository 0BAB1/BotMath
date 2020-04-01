const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    let m = "";
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

    if(args[1] && args[2])// si tout les arguments sont renseignés
    {
        let content = args.splice(2, args.length - 1);
        let timeId = Math.floor(Date.now()/1000);

        //recherche d'une ou plusieurs entrées portant déjà le nom donné
        for(let i in bot.devoirs)
        {
            if(bot.devoirs[i].nom.startsWith(args[1]) && bot.devoirs[i].channel == msg.channel.id && bot.devoirs[i].guild == msg.guild.id){
                k ++;
            };
        }
        if(k>1) {
            args[1] = `${args[1]}-${k}`;
            m = `Nom déja utilisé, j'ai modifié le nom en : **${args[1]}**\n`; //on sauvegarde pour n'afficher qu'un seul futur message
        }

        bot.devoirs[timeId] = { //on utilise le temps pour donner un Id à notre cours, de plus, on pourra les trier par ordre chrono dans dumpCours.js
            guild: msg.guild.id, //pour gérer plusieurs servers
            contenu: content,
            nom: args[1],
            channel: msg.channel.id //on utilise le channel id, propre à chaque classe
        }; //on definit le contenu du cours

        fs.writeFile("./cours/devoirs.json", JSON.stringify(bot.devoirs, null, 4), err =>{ //on l'ecrit dans le .json
            if(err) throw err;
            m += `Nouveau devoir pour le **${args[1]}** : *${content.join(" ")}*.`;
            msg.channel.send(m);
        });
    }
    else
    {
        msg.channel.send("Veuillez bien tout préciser (\"!math help\" pour plus d'infos) !");
    }
}

module.exports.help = {
    name: "addDevoir",
    desc: "`Permet d'ajouter un devoir.\nEx : !math addDevoir <date> <contenu du devoir>\nGardez une date simple, sans espace.\nCe devoir ne serra accessible que depuis le salon ou il a été envoyé.`"
}