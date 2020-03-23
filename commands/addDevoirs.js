const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("Vous n'avez pas la permission d'effectuer cette action !");

    if(args[1] && args[2])// si tout les arguments sont renseignés
    {
        let content = args.splice(2, args.length - 1);
        let timeId = Math.floor(Date.now()/1000);

        for(let i in bot.devoirs)
        {
            if(bot.devoirs[i].nom == args[1] && bot.devoirs[i].channel == msg.channel.id){
                args[1] = `${args[1]}-2`;
                msg.channel.send(`Nom déja utilisé, j'ai modifié le nom en : ${args[1]}`);
            };
        }

        bot.devoirs[timeId] = { //on utilise le temps pour donner un Id à notre cours, de plus, on pourra les trier par ordre chrono dans dumpCours.js
            guild: msg.guild.id, //pour gérer plusieurs servers
            contenu: content,
            nom: args[1],
            channel: msg.channel.id //on utilise le channel id, propre à chaque classe
        }; //on definit le contenu du cours

        fs.writeFile("./cours/devoirs.json", JSON.stringify(bot.devoirs, null, 4), err =>{ //on l'ecrit dans le .json
            if(err) throw err;
            msg.channel.send(`*${content.join().replace(/,/g, " ")}* : a été défini comme contenu du dernier cours, sous le nom de **${args[1]}**`);
        });
    }
    else
    {
        msg.channel.send("Veuillez bien tout préciser (\"!math help\" pour plus d'infos) !");
    }
}

module.exports.help = {
    name: "addDevoir",
    desc: "`Pour ajouter un devoir :\n!math addDevoir <date (pour le)> <contenu du devoir>\nGardez une date simple, sans espace.\nCe devoir ne serra accessible que depuis le salon ou il a été envoyé.`"
}
