const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("Vous n'avez pas la permission d'effectuer cette action !");

    if(args[1] && args[2])
    {
        let content = args.splice(2, args.length - 1);
        let timeId = Math.floor(Date.now()/1000);

        for(i in bot.cours)
        {
            if(bot.cours[i].nom == args[1] && bot.cours[i].channel == msg.channel.id && bot.cours[i].guild == msg.guild.id){
                args[1] = `${args[1]}-2`;
                msg.channel.send(`Nom déja utilisé, j'ai modifié le nom en : ${args[1]}`);
            };
        }

        bot.cours[timeId] = { //on utilise le temps pour donner un Id à notre cours, de plus, on pourra les trier par ordre chrono dans dumpCours.js
            guild: msg.guild.id, //pour gérer plusieurs servers
            contenu: content,
            nom: args[1],
            channel: msg.channel.id //on utilise le channel id, propre à chaque classe
        }; //on definit le contenu du cours

        fs.writeFile("./cours/last.json", JSON.stringify(bot.cours, null, 4), err =>{ //on l'ecrit dans le .json
            if(err) throw err;
<<<<<<< HEAD
            msg.channel.send(`*${content.join(" ")}* : a été défini comme contenu du dernier cours, sous le nom de **${args[1]}**`);
=======
            msg.channel.send(`*${content.join().replace(/,/g, " ")}* : a été défini comme contenu du dernier cours, sous le nom de **${args[1]}**`);
>>>>>>> 6f68b8fb08d3fa547c462496fd0186fb83e7d05f
        });
    }
    else
    {
        msg.channel.send("Veuillez bien tout préciser (\"!math help\" pour plus d'infos) !");
    }
}

module.exports.help = {
    name: "addCours",
    desc: "`Pour ajouter un cours :\n!math addCours <date> <contenu du cours>\nGardez une date simple, sans espace.\nCe cours ne serra accessible que depuis le salon ou il a été envoyé.`"
}
