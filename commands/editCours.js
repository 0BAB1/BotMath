const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
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

    if(args[1] && args[2])//si tout les arguments on été précisés, on peut traiter la demande
    {
        let content = args.splice(2, args.length - 1);
        let k = 0; //un itérateur

        for(i in bot.cours)
        {
            if(bot.cours[i].nom == args[1] && bot.cours[i].guild == msg.guild.id && content.cours[i].channel == msg.channel.id)
            {
                bot.cours[i] = { //on écrase les données
                    guild: msg.guild.id,
                    contenu: content,
                    nom: args[1],
                    channel: msg.channel.id
                };

                fs.writeFile("./cours/last.json", JSON.stringify(bot.cours, null, 4), err =>{ //on les sauvegarde
                    if(err) throw err;
                
                    msg.channel.send(`Nouveau contenu du cours du **${bot.cours[i].nom}** : *${content.join().replace(/,/g, " ")}*`);
                });
                k+=1; //si ca trouve un cours avec le bon nom
            }
        } // on retouve le cours en question

        if(k === 0) return msg.channel.send(`Pas de modificaton car pas de cours nommé **${args[1]}**`); // message d'erreur si k = 0 car ca veut dire que acun msg n'a été trouvé !

        return;
    }
    else
    {
        msg.channel.send("Veuillez bien tout préciser (\"!math help\" pour plus d'infos) !");
    }
}

module.exports.help = {
    name: "editCours",
    desc: "`Permet de modifier un cours existant.\nEx : !math editCours <nom> <nouveau contenu du cours>`"
}