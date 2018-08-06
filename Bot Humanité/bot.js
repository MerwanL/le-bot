const Enmap = require("enmap");
const EnmapLevel = require('enmap-level');
const Discord = require("discord.js");
const Conf = require("config.json");
const client = new Discord.Client();

const tableSource = new EnmapLevel({name: "Faith"});
client.myTable = new Enmap({provider: tableSource});

const prefix = "alo la foi ";

client.on('message', message => {
    if(message.author.bot) return;
    if(message.content.indexOf(prefix) !== 0) return;

    // This is the best way to define args. Trust me.
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    // CONNERIES
    if (message.content.startsWith(prefix)) {
        console.log("alo 1 arg 0 = "+args[0]);
        if(args[0] === "?")
        {
            var currentFaith = client.myTable.get("faith");
            message.reply('La foi en l\'humanité est actuellement de '+String(currentFaith)+' points');
        }
        else if(args[0] === '+')
        {
            if(isNaN(args[1]))
            {
                message.reply('tg c pa 1 numéro');
                return;
            }
            else if(parseInt(args[1]) < -100 || parseInt(args[1]) > 100) {
                message.reply('tg fo metr entr -100 et 100');
                return;
            }
            var currentFaith = client.myTable.get("faith");
            var addFaith = parseInt(args[1]);
            var newFaith = currentFaith + addFaith;
            client.myTable.set("faith", newFaith);
            message.reply('La foi en l\'humanité est actuellement de '+String(newFaith)+' points');
        }
        else if(args[0] === '-')
        {
            if(isNaN(args[1]))
            {
                message.reply('tg c pa 1 numéro');
                return;
            }
            else if(parseInt(args[1]) < -100 || parseInt(args[1]) > 100) {
                message.reply('tg fo metr entr -100 et 100');
                return;
            }
            var currentFaith = client.myTable.get("faith");
            var addFaith = parseInt(args[1]);
            var newFaith = currentFaith - addFaith;
            client.myTable.set("faith", newFaith);
            message.reply('La foi en l\'humanité est actuellement de '+String(newFaith)+' points');
        }
        else if (args[0] === 'r')
        {
            if(message.author.id == 110854821069729792)
            {
                client.myTable.set("faith", 0);
                message.reply("Foi en l'humanité reset.");
            }
            else{
                message.reply("TG t'es pas Vich.");
            }
        }
        else{
            message.reply('g pa konpri');
        }
    }
});

client.login(Conf.ApiKey);