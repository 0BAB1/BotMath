const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    msg.channel.send("mahihahu !")
}

module.exports.help = {
    name: "mahihahi",
    desc: "`Permet de tester si le bot est en fonctionnement.`"
}
