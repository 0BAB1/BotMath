const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) => {
    if(!args[1]){
        let embed = new Discord.MessageEmbed()
            .setTitle("Les horaires de cours")
            .setColor('#4bff5b')
            .setThumbnail("https://lambda.sx/DMY.png")
            .setFooter("Pour plus d'informations, contacter les professeurs.")
            .addField("Lundi :", `${bot.horaires.lundi}`)//on affiche a partir de bot.horaires
            .addField("Mardi :", `${bot.horaires.mardi}`)
            .addField("Mercredi :", `${bot.horaires.mercredi}`)
            .addField("Jeudi :", `${bot.horaires.jeudi}`)
            .addField("Vendredi :", `${bot.horaires.vendredi}`)
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

        if(!args[2]) return msg.channel.send('Renseignez un nouvel horaire'); // si il ny a pas de nouvel horraire de précisé

        let k = false;

        for(let i in bot.horaires){ //ici i va prendre les valeur des jours de la semaine, cf horaires.json
            if(i == args[1]){
                k = true; //on met k a true pour voir si on a bien trouver un horraire a modifier
                let newHoraires = args.splice(2, args.length - 1).join(" "); //on prend tout les argument du 3 eme au dernier C.A.D les nouveaux horraires  
                bot.horaires[i] = newHoraires;

                fs.writeFile("./horaires.json", JSON.stringify(bot.horaires, null, 4), err =>{ //on les sauvegarde
                    if(err) throw err;
                
                    msg.channel.send(`Nouvel horaire de **${i}** : *${newHoraires}* ===> pensez a les mettre a jour! `);
                });
            }
        }
        if(!k) return msg.channel.send(`${args[1]} n'est pas un jour valide !`);
    }
}

module.exports.help = {
    name: "horaires",
    desc: "`Permet d'afficher / modifier les horaires de cours.\nEx : !math horaires (affiche tous les horaires)\nEx : !math horaires <jour> <nouvel horaire> (modifie l'horaire du jour nommé)`"
}