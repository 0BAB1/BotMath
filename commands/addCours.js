const Discord = require('discord.js');
const fs = require("fs");

//function found here : https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

module.exports.run = async (bot, msg, args) =>{
    let m = ""; //message à affichers
    let k = 1; //pour compter le nombre d'entrées portant déjà le même nom, il y en a au moins une

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

    if(args[1] && args[2])
    {
        let content = args.splice(2, args.length - 1);
        let timeId = Math.floor(Date.now()/1000);

        //traitement du content pour éviter une intégration des url dans la réponse du bot
        for(let m in content){
            if(validURL(content[m])) {
                content[m] = "<"+content[m]+">";
            }
        }

        //recherche d'une ou plusieurs entrées portant déjà le nom donné
        for(i in bot.cours)
        {
            if(bot.cours[i].nom.startsWith(args[1]) && bot.cours[i].channel == msg.channel.id && bot.cours[i].guild == msg.guild.id){
                k ++;
            }
        }
        if(k>1) {
            args[1] = `${args[1]}-${k}`;
            m = `Nom déja utilisé, j'ai modifié le nom en : **${args[1]}**\n`; //on sauvegarde pour n'afficher qu'un seul futur message
        }

        bot.cours[timeId] = { //on utilise le temps pour donner un Id à notre cours, de plus, on pourra les trier par ordre chrono dans dumpCours.js
            guild: msg.guild.id, //pour gérer plusieurs servers
            contenu: content,
            nom: args[1],
            channel: msg.channel.id //on utilise le channel id, propre à chaque classe
        }; //on definit le contenu du cours

        fs.writeFile("./cours/cours.json", JSON.stringify(bot.cours, null, 4), err =>{ //on l'écrit dans le .json
            if(err) throw err;
            m += `Nouveau cours du **${args[1]}** : *${content.join(" ")}*.`;
            msg.channel.send(m);
        });
    }
    else
    {
        msg.channel.send("Veuillez bien tout préciser (\"!math help\" pour plus d'infos) !");
    }
}

module.exports.help = {
    name: "addCours",
    desc: "`Permet d'ajouter un cours.\nEx : !math addCours <date> <contenu du cours>\nGardez une date simple, sans espace.\nCe cours ne serra accessible que depuis le salon ou il a été envoyé.`"
}