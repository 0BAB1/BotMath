const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("pas la permission !");

    if(args[1] && args[2])
    {
        let content = args.splice(2, args.length - 1);
        let timeId = Math.floor(Date.now()/1000);

        for(i in bot.cours)
        {
            if(bot.cours[i].nom == args[1] && bot.cours[i].channel == msg.channel.id){
                args[1] = `${args[1]}-2`;
                msg.channel.send(`nom déja utilisé, j'ai modifier le nom en : ${args[1]}`);
            };
        }

        bot.cours[timeId] = { //on utilise le temps pour donner un Id a notre cours, de plus, on pourras les trier par ordre chrono dans dumpCours.js
            guild: msg.guild.id, //pour gerer plusieurs servers
            contenu: content,
            nom: args[1],
            channel: msg.channel.id //on utilise le channel id , propre a chaque classe
        }; //on defini le contenu du cours

        fs.writeFile("./cours/last.json", JSON.stringify(bot.cours, null, 4), err =>{ //on l'ecrit dans le .json
            if(err) throw err;
            msg.channel.send(` \`${content.join().replace(/,/g, " ")}\`  => a été définis comme contenu du dernier cours, sous le nom de ${args[1]}`);
        });
    }
    else
    {
        msg.channel.send("veuillez bien tou preciser (!SI help pour + d'infos");
    }
}

module.exports.help = {
    name: "addCours",
    desc: "`=> ajouter un cours:\n!math addCours <nom> <exp 8.3 vu | exo 2 | etc>\ngardez un nom simple pour le modifier/supprimer\nce même cours ne serra accessible que par le channel ou il a été envoyé\npour separer les differentes classes`"
}