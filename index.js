const Discord = require('discord.js');
const fs = require("fs");

const bot = new Discord.Client();
bot.botConfig = require("./config.json");
bot.commands = new Discord.Collection();
bot.mutes = require("./mutes.json");
bot.cours = require("./cours/cours.json");
bot.devoirs = require("./cours/devoirs.json");
bot.horaires = require("./horaires.json");
bot.utilisateurs = require("./cours/utilisateurs.json");

//=============================================================================================//
//===========================initialisation de la collection de commandes======================//
//=============================================================================================//

fs.readdir("./commands/", (err, files) => { //on regarde les fichiers dasn le dossier "commands"
    if(err) console.error(err); //s'il ya une erreur

    let jsfiles = files.filter(f => f.split(".").pop() === "js"); //on filtre les fichiers pour garder le .js
    if(jsfiles.length <= 0){
        console.log("no commands to load !");
        return;
    }

    console.log(`loading ${jsfiles.length} commands !`);

    jsfiles.forEach((f, i) => { //jsfiles, tableau , pour cahque élément
        let props = require(`./commands/${f}`); //on creer un varible de "require" pour l'élément
        console.log(`${i + 1} : chargement de => "${props.help.name}"`);
        bot.commands.set(f.split(".")[0], props); //on ajoute la commende a la collection bot.commands (on enleve le .js a la fin+)
    });
});

//=============================================================================================//
//=============BOT READY -> (generation invite/initialisation fonction unmute timed)===========//
//=============================================================================================//

bot.on("ready", async () => {

    //===================================//
    //=========présence discord==========//
    //===================================//

    bot.user.setActivity('de 8h à 22h', {type : 'WATCHING'});

    //===================================//
    //======génération lien invite=======//
    //===================================//
    try{
        let link = await  bot.generateInvite(["ADMINISTRATOR"]); //.generateInvite return une string que l'ont nomme link
        console.log(`lien d'invitation ${link}`);
    }
    catch(e)
    {
        console.log(e.stack);
    }
    console.log(`${bot.user.username} est pret !`);

    //===================================//
    //fonction unmute pour le timed mutes//
    //===================================//
    bot.setInterval(() => {
        for(let i in bot.mutes) { //pour chaque item dans l'objet mute, i correspond alors a l'id du membre "titre" dans le mutes.JSON
            let time = bot.mutes[i].time;
            let guildId = bot.mutes[i].guild;
            let guild = bot.guilds.cache.get(guildId);
            let member = guild.members.cache.get(i); //car i est l'id de la epersonne (pour rappel hein)
            let mutedRole = guild.roles.cache.find(r => r.name === "Wasted");
            if(!mutedRole) continue; //continue passe a la prochaine iteration de la boucle for

            if(Date.now() > time){
                member.roles.remove(mutedRole);
                delete bot.mutes[i];

                fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err =>{
                    if(err) throw err;
                    console.log(`${member.user.tag} => unmute`);
                });
            }
        }
    }, 5000);
    //setInterval, determine une fonction quie s'excute toutes les ... (intervalles precisée) , ici c'est pour unmute les gens
});

//=============================================================================================//
//============BOT MESSAGE -> aller chercher la commande dans le collection de commandes========//
//=============================================================================================//

bot.on("message", async msg => {
    if(msg.author.bot) return; //.bot return un booleen true si l'auteur est un bot
    if(msg.channel.type === "dm") return; // .channel.type return le type de channel , si c'est en DM , on arrete

    let messageArray = msg.content.split(" "); //.msg.content return le contenu du message (msg) .split(" ") va le decouper selon les especes et ranger chaque mot dans un tableau nommé "messageArray"
    let command = messageArray[0];
    let args = messageArray.slice(1); // va supprimer la commande (prefixe) de l'array car deja dans "commande"

    if(!command.startsWith(bot.botConfig.prefix)) return;

    let cmd = bot.commands.get(args[0]);
    if(cmd) cmd.run(bot,msg,args);
});

//bot login:
bot.login(bot.botConfig.token);
