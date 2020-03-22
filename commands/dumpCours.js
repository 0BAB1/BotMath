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
            if(bot.cours[i].guild == guildId && bot.cours[i].channel == msg.channel.id) coursArray.push(stringCour); //on fait un tbleau dans le quel se trouve les cours du serv dans lequel a été envoyé la commande.
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
                msg.channel.send(`*${stringCour}* ||| **nom du cours** : ${bot.cours[i].nom}`)
            }
        }
    }
    else
    {
        let nomAffiche = args[1];
        
        for(let i in bot.cours){
            stringCour = bot.cours[i].contenu.join().replace(/,/g, " "); // traitement pour avoir une belle string a afficher
            if(bot.cours[i].guild == guildId && bot.cours[i].channel == msg.channel.id && bot.cours[i].nom == nomAffiche) coursArray.push(stringCour); //on fait un tbleau dans le quel se trouve les cours du serv dans lequel a été envoyé la commande.
        }

        if(coursArray.length > 0) {
            msg.channel.send(coursArray);
        }
        else{
            msg.channel.send(`pas de cours nommé ${nomAffiche}`);
        }
        return;
    }
}

module.exports.help = {
    name: "dumpCours",
    desc: "`!math dumpCours last: affiche le dernier cours \n!math dumpCours <nom> ce que vous voulez>:\naffiche le cours\n!math dumpCours pour afficher tout les cours (tous..)`"
}