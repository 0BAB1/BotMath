const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("pas la permission !");

    if(!args[2]) return msg.channel.send("precisez un cours"); //si il n'y a pas de nom précisé

    for(i in bot.cours)
    {
        if(bot.cours[i].name == args[1] && msg.channel.id == bot.cours[i].channel && bot.cours[i].guild == msg.guild.id)
        {
            return;
        }
    }
}

module.exports.help = {
    name: "delCours",
    desc: "`=> supprimer un cours:\n!math delCours <nom>`"
}