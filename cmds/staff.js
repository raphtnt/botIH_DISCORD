const Discord = require("discord.js");
const config = require("../db/config.json");

module.exports.run = async(bot, message, args) => {

    if(config.devmode === true) return console.log("Mode dév | STAFF.JS");

    let membres = bot.guilds.cache.get('637716032106135582').members.cache
    let channelStaff = bot.guilds.cache.get('637716032106135582').channels.cache.get('637720000047611931');

    let staff_allowed_ticket = membres.filter(membre => membre.roles.cache.has("771781000216838144"))
    let staffOnline = staff_allowed_ticket.filter(membre => membre.user.presence.status !== 'offline')
    let staffOffline = staff_allowed_ticket.filter(membre => membre.user.presence.status === 'offline')

    let embed = new Discord.MessageEmbed()
        .setTitle(`STAFF`)
        .setColor("#5affbb")
        .addField(`Online : ${staffOnline.size}`, (staffOnline.size !== 0) ? staffOnline.map(member => member.user) : "Personne")
        .addField(`Offline : ${staffOffline.size}`, (staffOffline.size !== 0) ? staffOffline.map(member => member.user) : "Personne")

    // channelStaff.send(embed)

    channelStaff.messages.fetch({around: '779792493566623786', limit: 1})
        .then(msg => msg.first().edit(embed))
        .catch(err => console.log(err));

}

module.exports.config = {
    name: 'staff'
}