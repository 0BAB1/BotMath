const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("pas la permission !");

    if(args[1] && args[2])
    {
        let content = args.splice(2, args.length - 1);
        let k = 0; //un iterateur

        for(i in bot.cours)
        {
            if(bot.cours[i].nom == args[1] && bot.cours[i].guild == msg.guild.id)
            {
                bot.cours[i] = { //on ecrase les données
                    guild: msg.guild.id,
                    contenu: content,
                    nom: args[1],
                    channel: msg.channel.id
                };

                await fs.writeFile("./cours/last.json", JSON.stringify(bot.cours, null, 4), err =>{ //on les sauvegarde
                    if(err) throw err;
                
                    msg.channel.send(`c'est bon ! nouveau contenu => \`${content.join().replace(/,/g, " ")}\` , \`!math dumpCours\` pour afficher les cours`);
                });
                k+=1; //si ca trouve un cours avec le bon nom
            }
        } // on retouve le cours en question

        if(k === 0) return msg.channel.send(`pas de modifs faites car pas de cours nommé ${args[1]}`); // message d'erreur si k = 0 car ca veut dire que acun msg n'a été trouvé !

        return;
    }
    else
    {
        msg.channel.send("veuillez bien tout preciser (!SI help pour + d'infos");
    }
}

module.exports.help = {
    name: "editCours",
    desc: "`pour modifier des anciens cours\n!math modifCours <nom> <contenu>`"
}