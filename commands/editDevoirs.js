const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("Vous n'avez pas la permission d'effectuer cette action !"); //s'il a les perm

    if(args[1] && args[2])//si tout les arguments on été précisés, n peut traiter la demande
    {
        let content = args.splice(2, args.length - 1);
        let k = 0; //un iterateur

        for(i in bot.devoirs)
        {
            if(bot.devoirs[i].nom == args[1] && bot.devoirs[i].guild == msg.guild.id && bot.devoirs[i].channel == msg.channel.id)
            {
                bot.devoirs[i] = { //on écrase les données
                    guild: msg.guild.id,
                    contenu: content,
                    nom: args[1],
                    channel: msg.channel.id
                };

                fs.writeFile("./cours/devoirs.json", JSON.stringify(bot.devoirs, null, 4), err =>{ //on les sauvegarde
                    if(err) throw err;
                
                    msg.channel.send(`Nouveau contenu du devoir du **${bot.devoirs[i].nom}** : \`${content.join().replace(/,/g, " ")}\``);
                });
                k+=1; //si ca trouve un cours avec le bon nom
            }
        } // on retouve le cours en question

        if(k === 0) return msg.channel.send(`Pas de modificaton car pas de cours nommé ${args[1]}`); // message d'erreur si k = 0 car ca veut dire que acun msg n'a été trouvé !

        return;
    }
    else
    {
        msg.channel.send("Veuillez bien tout préciser (\`!math help\` pour plus d'infos) !");
    }
}

module.exports.help = {
    name: "editDevoirs",
    desc: "`Pour modifier des anciens devoirs\n!math modifCours <nom> <contenu du devoir>`"
}
