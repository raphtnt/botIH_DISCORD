const Discord = require("discord.js");
const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const config = require("./db/config.json")
const fs = require("fs");
// require('discord-buttons')(bot);
const disbut = require('discord-buttons');
disbut(bot);

bot.commands = new Discord.Collection();

fs.readdir('./cmds/', (err, files) => {
    if(err) console.log(err)
    let jsfile = files.filter(f => f.split(".").pop() === 'js')
    if(jsfile.length <= 0) {
        console.log("[HANDLER] : Aucune commande trouvée ! ")
    }

    jsfile.forEach((f, i) => {
        let props = require(`./cmds/${f}`)
        console.log(`[HANDLER]: ${f}`)
        bot.commands.set(props.config.name, props)
    })
})

fs.readdir("./events/", (error, f) => {
    if (error) console.log(error);
    console.log(`[EVENT] : ${f}`);

    f.forEach((f) => {
        const events = require(`./events/${f}`);
        const event = f.split(".")[0];
        bot.on(event, events.bind(null, bot));
    });
});

bot.login(config.token)