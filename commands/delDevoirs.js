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
        for(let i in bot.devoirs)
        {
            if(msg.channel.id == bot.devoirs[i].channel && bot.devoirs[i].guild == msg.guild.id)//seulement ceux du serv est du channel en question quand meme !
            {
                delete bot.devoirs[i]; //on efface a chaque iteration, on efface TOUT
            }
        }

        fs.writeFile("./cours/devoirs.json", JSON.stringify(bot.devoirs, null, 4), err =>{ //on sauvegarde
            if(err) throw err;
            msg.channel.send(`tout les cours ont été supprimé`);
        });
    }
}

module.exports.help = {
    name: "delDevoirs",
    desc: "`=> supprimer un devoir a faire:\n!math delDevoirs <nom> <all> all est optionel mais ATTENTION, il va tout supprimer`"
}