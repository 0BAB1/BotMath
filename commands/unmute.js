const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) => {
    if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("pas la permission !");

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

    console.log(`${toUnmute.user.tag} => unmute => par ${msg.author.username}`);


    msg.channel.send('il a été unmute !');
}

module.exports.help = {
    name: "unmute",
    desc: "`pour unmute , !math unmute <mention>`"
}