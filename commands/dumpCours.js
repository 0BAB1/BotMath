const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    let guildId = msg.guild.id;
    let coursArray = new Array;
    let stringCour = new String;

    //===================================//
    //=====afficher le dernier cours=====//
    //===================================//
    
    if(args[1] === "last")
    {
        for(let i in bot.cours){
            stringCour = bot.cours[i].contenu.join().replace(/,/g, " "); // traitement pour avoir une belle string a afficher
            if(bot.cours[i].guild == guildId && bot.cours[i].channel == msg.channel.id) coursArray.push(stringCour); //on fait un tableau dans lequel se trouvent les cours du salon dans lequel a été envoyé la commande.
        }

        if(coursArray.length > 0) msg.channel.send(coursArray[coursArray.length - 1]);
        return;
    }
    else if(!args[1])
    {
        for(let i in bot.cours){
            if(bot.cours[i].guild == guildId && bot.cours[i].channel == msg.channel.id) 
            {
                stringCour = bot.cours[i].contenu.join().replace(/,/g, " "); // traitement pour avoir une belle string a afficher
                msg.channel.send(`Cours du **${bot.cours[i].nom}** : *${stringCour}*`)
            }
        }
    }
    //===================================//
    //===========tout afficher===========//
    //===================================//
    else
    {
        let nomAffiche = args[1];
        
        for(let i in bot.cours){
            stringCour = bot.cours[i].contenu.join().replace(/,/g, " "); // traitement pour avoir une belle string a afficher
            if(bot.cours[i].guild == guildId && bot.cours[i].channel == msg.channel.id && bot.cours[i].nom == nomAffiche) coursArray.push(stringCour); //on fait un tableau dans lequel se trouvent les cours du salon dans lequel a été envoyé la commande.
        }

        if(coursArray.length > 0) {
            msg.channel.send(coursArray);
        }
        else{
            msg.channel.send(`Aucun cours nommé **${nomAffiche}**`);
        }
        return;
    }
}

module.exports.help = {
    name: "dumpCours",
    desc: "`Pour afficher un cours.!math dumpCours last : affiche le dernier cours.\n!math dumpCours <nom> : affiche le cours nommé.\n!math dumpCours : affiche tous les cours.`"
}
