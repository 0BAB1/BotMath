commandes

pour ajouter une commande : creez /commands/nomCommande.js

sample de commande : (la commande de test mahihahi):

const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    msg.channel.send("mahihahu !")
}

module.exports.help = {
    name: "mahihahi",
    desc: "`!math mahihahi, test pour sevoir si le bot est en fonctionnement, s'il répond, ca fonctionne !`"
}
