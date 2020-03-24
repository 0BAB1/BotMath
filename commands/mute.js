const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("pas la permission !");

    let toMute = msg.guild.member(msg.mentions.users.first() || msg.guild.members.cache.get(args[1]));
    if(!toMute) return msg.channel.send("il faut mentionner qqun ou donner son id"); // si il n'existe pas

    let role = msg.guild.roles.cache.find(r => r.name === "Wasted"); // on defini le role

    //===================================//
    //========creation du role===========//
    //===================================//

    if(!role){ //si on a pas trouver le role on le creer

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

    if(toMute.roles.cache.has(role.id) && args[2]) return msg.channel.send("cet utilisateur est deja mute !"); //si le mec est deja mute, on arrete
    //on check aussi s'il donne du temps sinon on check pour l'ecrasement

    //===================================//
    //=========appliquer le mute=========//
    //===================================//

    if(args[2])//si il ya un temps de précisé
    {
        bot.mutes[toMute.id] = {
            guild: msg.guild.id,
            time: Date.now() + parseInt(args[2]) * 1000
        }; //on update le bot.mutes

        fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err =>{
            if(err) throw err;
            msg.channel.send(`<@${toMute.id}> reduit au silence pour ${args[2]} secondes`);
            console.log(`${toMute.user.tag} => mute pour ${args[2]} secondes => par ${msg.author.username}`);
        }); //on update le fichier
    }
    else //s'il ya pas de temps, le mute sans laisser de traces, c'est aux modo de gerer le reste
    {
        if(toMute.roles.cache.has(role.id))
        {
            if(!bot.mutes[toMute.id]) return msg.channel.send("deja permaMute ..");

            delete bot.mutes[toMute.id];

            fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err =>{
                if(err) throw err;
                msg.channel.send(`<@${toMute.id}> purges desormais sa peine jusqu'a nouvel ordre !`);
                console.log(`${toMute.user.tag} => mute depuis timed to perma par ${msg.author.username}`);
            });
        }
        else
        {
            msg.channel.send(`<@${toMute.id}> reduit au silence pour une duré indeterminée pensez a le unmute !`);
            console.log(`${toMute.user.tag} => mute => par ${msg.author.username}`);
        }
    }

    try{
        await toMute.roles.add(role); //on lui ajoute le role
    }catch(e){
        console.log(e.stack);
    }

    return;

}

module.exports.help = {
    name: "mute",
    desc: "`Permet de réduire quelqu'un au silence.\nEx : !math mute <mention> <temps en s (optionel)>`"
}