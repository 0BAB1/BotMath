const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) => {
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

    let toUnmute = msg.guild.member(msg.mentions.users.first() || msg.guild.members.cache.get(args[1]));
    if(!toUnmute) return msg.channel.send("metionnez qqun ou donnez son id");

    let role = msg.guild.roles.cache.find(r => r.name === "Wasted");

    //===================================//
    //========création du role===========//
    //===================================//
    //(s'il existe pas deja, on le laisse dans unmute.js pour avoir le role 
    //dès qu'on utilise une commande en rapport avec le mute/unmute .)

    if(!role){

        try{
            role = await msg.guild.roles.create({data:{
                name:"Wasted",
                color:"#000000",
                hoist: true,
                permissions: []
            }});

            msg.guild.channels.cache.forEach(async (channel, id) => {
                await channel.updateOverwrite(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(e){
            console.log(e.stack);
        } 
    }

    if(!toUnmute.roles.cache.has(role.id)) return msg.channel.send("n'est pas mute !");//si le mec n'est pas mute , on arrete

    //===================================//
    //======application du unmute========//
    //===================================//

    try{
        await toUnmute.roles.remove(role);
    }catch(e){
        console.log(e.stack);
    }

    if(bot.mutes[toUnmute.id])//si il est dans bot.mute CAD si c'est un timed ban
    {
        delete bot.mutes[toUnmute.id];

        fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err =>{
            if(err) throw err;
        });
    }

    console.log(`${toUnmute.user.tag} réduit au silence par ${msg.author.username}`);


    msg.channel.send('il a été unmute !');
}

module.exports.help = {
    name: "unmute",
    desc: "`Permet de redonner la parole à quelqu'un.\nEx : !math unmute <mention>`"
}