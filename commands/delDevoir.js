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

    if(!args[1]) return msg.channel.send("Précisez un cours."); //s'l n'y a pas de nom précisé

    let k = 0; //iterateur pour savoir si on a trouvé un fichier

    //===================================//
    //========supprimer un cours=========//
    //===================================//

    if(args[1] != "all")
    {
        for(let i in bot.devoirs)
        {
            if(bot.devoirs[i].nom == args[1] && msg.channel.id == bot.devoirs[i].channel && bot.devoirss[i].guild == msg.guild.id)
            {
                delete bot.devoirs[i]; //on efface la "case"
                k+=1;
            }
        }

        if(k >= 1)
        {
            fs.writeFile("./cours/devoirs.json", JSON.stringify(bot.devoirs, null, 4), err =>{ //on sauvegarde
                if(err) throw err;
                msg.channel.send(`Le devoir du **${args[1]}** a été supprimé.`);
            });
        }
        else
        {
            msg.channel.send("Pas de cours trouvé portant ce nom.");
        }
    }

    //===================================//
    //======tout supprimer mouhaha=======//
    //===================================//

    else if(args[1] === "all")
    {
        for(let i in bot.devoirs)
        {
            if(msg.channel.id == bot.devoirs[i].channel && bot.devoirs[i].guild == msg.guild.id)//seulement ceux du serv est du channel en question quand meme !
            {
                delete bot.devoirs[i]; //on efface a chaque iteration, on efface TOUT
            }
        }

        fs.writeFile("./cours/devoirs.json", JSON.stringify(bot.devoirs, null, 4), err =>{ //on sauvegarde
            if(err) throw err;
            msg.channel.send(`Tous les cours ont été supprimés.`);
        });
    }
}

module.exports.help = {
    name: "delDevoir",
    desc: "`Permet de supprimer un devoir.\nEx : !math delDevoir <nom> (supprime le devoir nommé)\nEx : !math delDevoir all (supprimer tous les devoirs)`"
}