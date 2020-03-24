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

        fs.writeFile("./cours/cours.json", JSON.stringify(bot.cours, null, 4), err =>{ //on l'écrit dans le .json
            if(err) throw err;
            msg.channel.send(`*${content.join(" ")}* : a été défini comme contenu du dernier cours, sous le nom de **${args[1]}**`);
        });
    }
    else
    {
        msg.channel.send("Veuillez bien tout préciser (\"!math help\" pour plus d'infos) !");
    }
}

module.exports.help = {
    name: "addCours",
    desc: "`Permet d'ajouter un cours.\n!Ex : math addCours <date> <contenu du cours>\nGardez une date simple, sans espace.\nCe cours ne serra accessible que depuis le salon ou il a été envoyé.`"
}