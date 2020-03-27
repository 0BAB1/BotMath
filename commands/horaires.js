const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) => {
    let defaultTxt = "à renseigner";
    let week = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

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

    if(!args[1]){
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
        //=====================================//
        //vérifier si l'horaire est appliquable//
        //=====================================//
        if(!args[2]) return msg.channel.send('Renseignez un nouvel horaire !'); // s'il n'y a pas de nouvel horraire précisé

        let newSchedule = args.splice(2, args.length - 1).join(" "); //on prend tous les arguments du 3 eme au dernier c.a.d les nouveaux horaires
        
        //version factorisée du switch
        if(week.includes(args[1])) {
            bot.horaires[msg.channel.id][args[1]] = newSchedule;
            fs.writeFile("./horaires.json", JSON.stringify(bot.horaires, null, 4), err =>{
                if(err) throw err;
                msg.channel.send(`Nouvel horaire du **${args[1]}** : *${newSchedule}*`);
            });
        } else {
            msg.channel.send(`${args[1]} n'est pas un jour valide !`);
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