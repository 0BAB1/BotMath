const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) => {
    let defaultTxt = "à renseigner";
    let week = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
    let m = "";

    //=====================================//
    //======définir valeur par defaut======//
    //=====================================//

    if(!bot.horaires[msg.channel.id]) //s'il n'y a pas d'horaires associés à ce channel, on y met des horaires par défaut , ici "à reseigner"
    {
        bot.horaires[msg.channel.id] = {
            guild : msg.guild.id, //utilité ?
            Lundi : defaultTxt, //les majuscules au nom des jours sont importantes
            Mardi : defaultTxt, //car on va les afficher directement dans l'embed
            Mercredi : defaultTxt,
            Jeudi : defaultTxt,
            Vendredi : defaultTxt
        }

        fs.writeFile("./horaires.json", JSON.stringify(bot.horaires, null, 4), err =>{
            if(err) throw err;
            //pas de retour à base de msg.channel.send car cette opération doit être transparente !
        });
    }

    //=====================================//
    //============tout afficher============//
    //=====================================//

    if(!args[1]){ //args[1] est le nom du jour écrit après "horaires"
        let embed = new Discord.MessageEmbed()
            .setTitle("Les horaires de cours")
            .setColor('#4bff5b')
            .setThumbnail("https://lambda.sx/DMY.png")
            .setFooter("Pour plus d'informations, contacter les professeurs.")
        
        //on n'affiche que les jours où il y a cours
        for(let m in bot.horaires[msg.channel.id]) {
            if(m!="guild" && bot.horaires[msg.channel.id][m] != defaultTxt){
                embed.addField(`${m} : `, bot.horaires[msg.channel.id][m]);
            }
        }

        if(embed.fields.length==0) { //si pas d'horaire existant : insulte
            embed.addField("Aucun horaire défini.", "Veuillez saisir un horaire !");
        } else {
            embed.addField("Et surtout :", "Soyez à l'heure !");
        }

        msg.channel.send(embed);
    }
    //=====================================//
    //===============modifier==============//
    //=====================================//
    else {
        if(!msg.member.hasPermission("ADMINISTRATOR")) { //on check les perms, sinon, ça dégage !
            if(msg.deletable) {
                msg.delete({timeout:3000}); //supression du message
                msg.reply("Vous n'avez pas la permission d'effectuer cette action, supression du message dans 3 secondes !")
                    .then(b_msg => {b_msg.delete({timeout:3000});}); //supression de la réponse du bot
            } else {
                msg.reply("Vous n'avez pas la permission d'effectuer cette action !");
            }
    
            return;
        }

        //on prend tous les arguments du 3e au dernier c.a.d les nouveaux horaires
        //newSchedule peut être vide, si aucun horaire n'est précisé après le nom du jour
        let newSchedule = args.splice(2, args.length - 1).join(" ");
        
        //version factorisée du switch, avec prise en compte de la supression d'un horaire
        if(week.includes(args[1])) {
            //s'il n'y a pas d'horaire précisé, c.a.d si newSchedule est vide, on supprime l'horaire
            bot.horaires[msg.channel.id][args[1]] = (newSchedule.length==0) ? defaultTxt : newSchedule;
            m = (newSchedule.length==0) ? `Supression de l'horaire du **${args[1]}**.` : `Nouvel horaire du **${args[1]}** : *${newSchedule}*.`;

            fs.writeFile("./horaires.json", JSON.stringify(bot.horaires, null, 4), err =>{
                if(err) throw err;
                msg.channel.send(m);
            });
        } else {
            msg.channel.send(`**${args[1]}** n'est pas un jour valide ! Les jours valides sont : ${week.join(", ")}.`);
        }

        /*
        switch(args[1]){ //il n'y a que 5 jours, on peut se permettre de faire un switch
            case 'Lundi':
                bot.horaires[msg.channel.id].Lundi = newHoraires;
                fs.writeFile("./horaires.json", JSON.stringify(bot.horaires, null, 4), err =>{
                    if(err) throw err;
                    msg.channel.send(`Nouvel horaire du **${args[1]}** : *${newHoraires}*`);
                });
                break;

            case 'Mardi':
                bot.horaires[msg.channel.id].Mardi = newHoraires;
                fs.writeFile("./horaires.json", JSON.stringify(bot.horaires, null, 4), err =>{
                    if(err) throw err;
                    msg.channel.send(`Nouvel horaire du **${args[1]}** : *${newHoraires}*`);
                });
                break;

            case 'Mercredi':
                bot.horaires[msg.channel.id].Mercredi = newHoraires;
                fs.writeFile("./horaires.json", JSON.stringify(bot.horaires, null, 4), err =>{
                    if(err) throw err;
                    msg.channel.send(`Nouvel horaire du **${args[1]}** : *${newHoraires}*`);
                });
                break;

            case 'Jeudi':
                bot.horaires[msg.channel.id].Jeudi = newHoraires;
                fs.writeFile("./horaires.json", JSON.stringify(bot.horaires, null, 4), err =>{
                    if(err) throw err;
                    msg.channel.send(`Nouvel horaire du **${args[1]}** : *${newHoraires}*`);
                });
                break;

            case 'Vendredi':
                bot.horaires[msg.channel.id].Vendredi = newHoraires;
                fs.writeFile("./horaires.json", JSON.stringify(bot.horaires, null, 4), err =>{
                    if(err) throw err;
                    msg.channel.send(`Nouvel horaire du **${args[1]}** : *${newHoraires}*`);
                });
                break;

            default:
                msg.channel.send(`${args[1]} n'est pas un jour valide !`);
        }
        */
    }
}

module.exports.help = {
    name: "horaires",
    desc: "`Permet d'afficher / modifier les horaires de cours.\nEx : !math horaires (affiche tous les horaires)\nEx : !math horaires <jour> <nouvel horaire> (modifie l'horaire du jour nommé)`"
}