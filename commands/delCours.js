const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("pas la permission !");

    if(!args[1]) return msg.channel.send("precisez un cours"); //si il n'y a pas de nom précisé

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
                delete bot.cours[i]; //on efface la "case"
                k+=1;
            }
        }

        if(k >= 1)
        {
            fs.writeFile("./cours/last.json", JSON.stringify(bot.cours, null, 4), err =>{ //on sauvegarde
                if(err) throw err;
                msg.channel.send(`${args[1]} a été supprimé`);
            });
        }
        else
        {
            msg.channel.send("pas de cours trouvé portant ce nom");
        }
    }

    //===================================//
    //======tout supprimer mouhaha=======//
    //===================================//

    else if(args[1] === "all")
    {
        for(let i in bot.cours)
        {
            delete bot.cours[i]; //on efface a chaque iteration, on efface TOUT
        }

        fs.writeFile("./cours/last.json", JSON.stringify(bot.cours, null, 4), err =>{ //on sauvegarde
            if(err) throw err;
            msg.channel.send(`tout les cours ont été supprimé`);
        });
    }
}

module.exports.help = {
    name: "delCours",
    desc: "`=> supprimer un cours:\n!math delCours <nom> <all> all est optionel mais ATTETION, il va tout supprimer`"
}