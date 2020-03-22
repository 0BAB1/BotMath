const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("tu n'as pas la premission"); //s'il a les perm

    let content = args.splice(1, args.length - 1);
    let timeId = Math.floor(Date.now()/1000);

    bot.cours[timeId] = { //on utilise le temps pour donner un Id a notre cours, de plus, on pourras les trier par ordre chrono dans dumpCours.js
        guild: msg.guild.id, //pour gerer plusieurs servers
        contenu: content
    }; //on defini le contenu du cours

    fs.writeFile("./cours/last.json", JSON.stringify(bot.cours, null, 4), err =>{ //on l'ecrit dans le .json
        if(err) throw err;
        msg.channel.send(` \`${content}\` a été définis comme contenu du dernier cours, `);
    });
}

module.exports.help = {
    name: "addCours",
    desc: "`ajouter un cours:\nSI addCours <exp 8.3 vu | exo 2 | etc>`"
}