const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    let guildId = msg.guild.id;
    let devoirsArray = new Array;
    let stringDevoir = new String;

    //===================================//
    //=====afficher le dernier cours=====//
    //===================================//
    
    if(args[1] === "last")
    {
        for(let i in bot.devoirs){
            stringDevoir = bot.devoirs[i].contenu.join().replace(/,/g, " "); // traitement pour avoir une belle string a afficher
            if(bot.devoirs[i].guild == guildId && bot.devoirs[i].channel == msg.channel.id) devoirsArray.push(stringDevoir);var nom = bot.devoirs[i].nom; //on fait un tableau dans lequel se trouvent les cours du salon dans lequel a été envoyé la commande.
        }//le petit var nom prend la valeur du nom du dernier devoir pour l'affcher ensuite, pas tres opti comme partie, a refaire eventuellement

        if(devoirsArray.length > 0) msg.channel.send(`devoirs pour le : **${nom}** ===> *${devoirsArray[devoirsArray.length - 1]}*`);
        return;
    }
    
    else if(!args[1])
    {
        for(let i in bot.devoirs){
            if(bot.devoirs[i].guild == guildId && bot.devoirs[i].channel == msg.channel.id) 
            {
                stringDevoir = bot.devoirs[i].contenu.join().replace(/,/g, " "); // traitement pour avoir une belle string a afficher
                msg.channel.send(`Devoirs pour le **${bot.devoirs[i].nom}** : *${stringDevoir}*`)
            }
        }
    }

    //===================================//
    //===========tout afficher===========//
    //===================================//

    else
    {
        let nomAffiche = args[1];
        let devoirsArray = new Array;
        let stringDevoir = new String;
        
        for(let i in bot.devoirs){
            stringDevoir = bot.devoirs[i].contenu.join().replace(/,/g, " "); // traitement pour avoir une belle string a afficher
            if(bot.devoirs[i].guild == guildId && bot.devoirs[i].channel == msg.channel.id && bot.devoirs[i].nom == nomAffiche) devoirsArray.push(stringDevoir); //on fait un tableau dans lequel se trouvent les cours du salon dans lequel a été envoyé la commande.
        }

        if(devoirsArray.length > 0) {
            msg.channel.send(devoirsArray);
        }
        else{
            msg.channel.send(`Aucun cours nommé ${nomAffiche}`);
        }
        return;
    }
}

module.exports.help = {
    name: "dumpCours",
    desc: "`!math dumpCours last : affiche le dernier cours\n!math dumpCours <nom> : affiche le cours nommé\n!math dumpCours : affiche tous les cours`"
}
