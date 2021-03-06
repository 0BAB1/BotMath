const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    let stringCours = new String;

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

    if(!args[1]) return msg.channel.send("Précisez ce que vous souhaitez effacer."); //s'il n'y a pas de nom précisé

    let k = 0; //iterateur pour savoir si on a trouvé un fichier

    //===================================//
    //========supprimer un cours=========//
    //===================================//

    if(args[1] != "all")
    {
        for(let i in bot.cours)
        {
            if(bot.cours[i].nom == args[1] && msg.channel.id == bot.cours[i].channel && bot.cours[i].guild == msg.guild.id)
            {
                stringCours = bot.cours[i].contenu;
                delete bot.cours[i]; //on efface la "case" et l'objet cours qui s'y trouve
                k+=1;
                break; //pas la peine de continuer à chercher une entrée, on l'a déjà effacée
            }
        }

        if(k >= 1)
        {
            fs.writeFile("./cours/cours.json", JSON.stringify(bot.cours, null, 4), err =>{ //on sauvegarde
                if(err) throw err;
                msg.channel.send(`Le cours du **${args[1]}** (*${stringCours}*) a été supprimé !`);
            });
        }
        else
        {
            msg.channel.send("Pas de cours trouvé portant ce nom !");
        }
    }

    //===================================//
    //======tout supprimer mouhaha, le rêve de BABIN=======// 
    //===================================//

    else if(args[1] === "all")
    {
        for(let i in bot.cours)
        {
            if(msg.channel.id == bot.cours[i].channel && bot.cours[i].guild == msg.guild.id)//seulement ceux du serveur est du channel en question quand meme !
            {
                delete bot.cours[i]; //on efface a chaque iteration, on efface TOUT
            }
        }

        fs.writeFile("./cours/cours.json", JSON.stringify(bot.cours, null, 4), err =>{ //on sauvegarde
            if(err) throw err;
            msg.channel.send(`Tous les cours ont été supprimés !`);
        });
    }
}

module.exports.help = {
    name: "delCours",
    desc: "`Permet de supprimer un cours.\nEx : !math delCours <nom> (supprime le cours nommé)\nEx : !math delCours all (supprime tous les cours)`"
}