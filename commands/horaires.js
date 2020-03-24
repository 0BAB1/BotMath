const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) => {
    if(!args[1]){
        let embed = new Discord.MessageEmbed()
            .setTitle("Les horraires de cours.")
            .setColor('#4bff5b')
            .setThumbnail("https://lambda.sx/DMY.png")
            .setFooter("Pour plus d'informations, contacter les professeurs")
            .addField("lundi", `${bot.horaires.lundi}`)//on affiche a partir de bot.horraires
            .addField("mardi", `${bot.horaires.mardi}`)
            .addField("mercredi", `${bot.horaires.mercredi}`)
            .addField("jeudi", `${bot.horaires.jeudi}`)
            .addField("vendredi", `${bot.horaires.vendredi}`)
            .addField("et sutout", "soyez a l'heure !")
        
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

        if(!args[2]) return msg.channel.send('renseignez un nouvel horraire svp'); // si il ny a pas de nouvel horraire de précisé

        let k = false;

        for(let i in bot.horaires){ //ici i va prendre les valeur des jours de la semaine , cf horaires.json
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
    desc: "` \`!math horaires\` Affiches les horaires des cours\n\`!math horaires <jour> <nouvel horraire>\`modifier des horraires`"
}
