const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    let stringDevoir = new String;

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

    if(!args[1]) return msg.channel.send("Précisez ce que vous souhaitez effacer."); //s'l n'y a pas de nom précisé

    let k = 0; //iterateur pour savoir si on a trouvé un fichier

    //===================================//
    //========supprimer un cours=========//
    //===================================//

    if(args[1] != "all")
    {
        for(let i in bot.devoirs)
        {
            if(bot.devoirs[i].nom == args[1] && msg.channel.id == bot.devoirs[i].channel && bot.devoirs[i].guild == msg.guild.id)
            {
                stringDevoir = bot.devoirs[i].contenu.join(" "); // traitement pour avoir une belle string a afficher
                delete bot.devoirs[i]; //on efface la "case"
                k+=1;
                break; //pas la peine de continuer à chercher une entrée, on l'a déjà effacée
            }
        }

        if(k >= 1)
        {
            fs.writeFile("./cours/devoirs.json", JSON.stringify(bot.devoirs, null, 4), err =>{ //on sauvegarde
                if(err) throw err;
                msg.channel.send(`Le devoir pour le **${args[1]}** (*${stringDevoir}*) a été supprimé !`);
            });
        }
        else
        {
            msg.channel.send("Pas de devoir trouvé portant ce nom !");
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
            msg.channel.send(`Tous les devoirs ont été supprimés !`);
        });
    }
}

module.exports.help = {
    name: "delDevoir",
    desc: "`Permet de supprimer un devoir.\nEx : !math delDevoir <nom> (supprime le devoir nommé)\nEx : !math delDevoir all (supprimer tous les devoirs)`"
}