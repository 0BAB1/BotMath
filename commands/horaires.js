const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) => {

    if(!bot.horaires[msg.channel.id])//si il n'y as pas d'horraires associés a ce channel, on y met des horraires par defaut , ici "a reseigner"
    {
        let defaultTxt = "a renseigner";
        bot.horaires[msg.channel.id] = {
            guild : msg.guild.id,
            lundi : defaultTxt,
            mardi : defaultTxt,
            mercredi : defaultTxt,
            jeudi : defaultTxt,
            vendredi : defaultTxt
        }

        fs.writeFile("./horaires.json", JSON.stringify(bot.horaires, null, 4), err =>{ //on oublie pas de save ca !
            if(err) throw err;
            //pas de retour a base de msg.channel.send car cette opération doit être transparente !
        });
    }

    if(!args[1]){
        let embed = new Discord.MessageEmbed()
            .setTitle("Les horaires de cours")
            .setColor('#4bff5b')
            .setThumbnail("https://lambda.sx/DMY.png")
            .setFooter("Pour plus d'informations, contacter les professeurs.")
            .addField("Lundi :", `${bot.horaires[msg.channel.id].lundi}`)//on affiche a partir de bot.horaires
            .addField("Mardi :", `${bot.horaires[msg.channel.id].mardi}`)
            .addField("Mercredi :", `${bot.horaires[msg.channel.id].mercredi}`)
            .addField("Jeudi :", `${bot.horaires[msg.channel.id].jeudi}`)
            .addField("Vendredi :", `${bot.horaires[msg.channel.id].vendredi}`)
            .addField("Et surtout :", "Soyez à l'heure !")
        
        msg.channel.send(embed);
    }
    else
    {
        if(!msg.member.hasPermission("ADMINISTRATOR")) { // on check les perms, sinon, ça dégage !
            if(msg.deletable) {
                msg.delete({timeout:3000}); //supression du message
                msg.reply("Vous n'avez pas la permission d'effectuer cette action, supression du message dans 3 secondes !")
                    .then(b_msg => {b_msg.delete({timeout:3000});}); //supression de la réponse du bot
            } else {
                msg.reply("Vous n'avez pas la permission d'effectuer cette action !");
            }
    
            return;
        }
        //=====================================//
        //verifier si l'horaire est appliquable//
        //=====================================//
        if(!args[2]) return msg.channel.send('Renseignez un nouvel horaire'); // si il ny a pas de nouvel horraire de précisé

        let newHoraires = args.splice(2, args.length - 1).join(" "); //on prend tout les argument du 3 eme au dernier C.A.D les nouveaux horraires

        switch(args[1]){ //il n'y a que 5 jours, on peut se permettre de faire un switch
            case 'lundi':
                bot.horaires[msg.channel.id].lundi = newHoraires;
                fs.writeFile("./horaires.json", JSON.stringify(bot.horaires, null, 4), err =>{ //on oublie pas de save ca !
                    if(err) throw err;
                    msg.channel.send(`nouvel horaire du **${args[1]}** : *${newHoraires}*`);
                });
                break;

            case 'mardi':
                bot.horaires[msg.channel.id].mardi = newHoraires;
                fs.writeFile("./horaires.json", JSON.stringify(bot.horaires, null, 4), err =>{ //on oublie pas de save ca !
                    if(err) throw err;
                    msg.channel.send(`nouvel horaire du **${args[1]}** : *${newHoraires}*`);
                });
                break;
            case 'mercredi':
                bot.horaires[msg.channel.id].mercredi = newHoraires;
                fs.writeFile("./horaires.json", JSON.stringify(bot.horaires, null, 4), err =>{ //on oublie pas de save ca !
                    if(err) throw err;
                    msg.channel.send(`nouvel horaire du **${args[1]}** : *${newHoraires}*`);
                });
                break;

            case 'jeudi':
                bot.horaires[msg.channel.id].jeudi = newHoraires;
                fs.writeFile("./horaires.json", JSON.stringify(bot.horaires, null, 4), err =>{ //on oublie pas de save ca !
                    if(err) throw err;
                    msg.channel.send(`nouvel horaire du **${args[1]}** : *${newHoraires}*`);
                });
                break;

            case 'vendredi':
                bot.horaires[msg.channel.id].vendredi = newHoraires;
                fs.writeFile("./horaires.json", JSON.stringify(bot.horaires, null, 4), err =>{ //on oublie pas de save ca !
                    if(err) throw err;
                    msg.channel.send(`nouvel horaire du **${args[1]}** : *${newHoraires}*`);
                });
                break;

            default:
                msg.channel.send(`${args[1]} n'est pas un jour valide !`);
        }
    }
}

module.exports.help = {
    name: "horaires",
    desc: "`Permet d'afficher / modifier les horaires de cours.\nEx : !math horaires (affiche tous les horaires)\nEx : !math horaires <jour> <nouvel horaire> (modifie l'horaire du jour nommé)`"
}