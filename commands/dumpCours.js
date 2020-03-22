const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    let guildId = msg.guild.id;
    let coursArray = new Array;
    let stringCour = new String;
    
    if(args[1] === "last")
    {
        for(let i in bot.cours){
            stringCour = bot.cours[i].contenu.join().replace(/,/g, " "); // traitement pour avoir une belle string a afficher
            if(!(bot.cours[i].guild != guildId)) coursArray.push(stringCour); //on fait un tbleau dans le quel se trouve les cours du serv dans lequel a été envoyé la commande.
        }

        msg.channel.send(coursArray[coursArray.length - 1]);
        return;
    }
    else if(!args[1])
    {
        return msg.channel.send("precisez qq chose ! !SI help pour + d'infos");
    }
    else
    {
        let delay = parseInt(args[1]);
        
        for(let i in bot.cours){
            stringCour = bot.cours[i].contenu.join().replace(/,/g, " "); // traitement pour avoir une belle string a afficher
            if(!(bot.cours[i].guild != guildId)) coursArray.push(stringCour); //on fait un tbleau dans le quel se trouve les cours du serv dans lequel a été envoyé la commande.
        }
        
        if(delay >= coursArray.length) return msg.channel.send("on a pas eu autant de cours !");

        msg.channel.send(coursArray[coursArray.length - delay]);
        return;
    }
}

module.exports.help = {
    name: "dumpCours",
    desc: "`!SI dumpCours last: affiche le dernier cours \n!SI dumpCours <1 => > ce que vous voulez>:\naffiche le cours d'il y a ... jours`"
}