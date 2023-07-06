const Discord = require("discord.js")
const { logChannel } = require('../modules/logs')

module.exports.run = async(bot, message, args) => {
    message.delete()
// !slowmode 10
    if(Number.isInteger(args[0]) || args[1] === undefined) return;
    if(!message.member.roles.cache.some(role => ["Owner", "STAFF", "Support"].includes(role.name))) return;

    // if(isNaN(args)) return;
    await message.channel.setRateLimitPerUser(args[0], args[1])

    let LogEmbed = new Discord.MessageEmbed()
        .setTitle(`ADMIN`)
        .setDescription(`**Slowmode**`)
        .setColor("#ff0000")
        .setAuthor(message.author.tag)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 512}))
        .addField("Channel", message.channel.name)
        .addField("Temps :", args[0])
        .addField("Raison :", args[1])
        .setFooter(`IHLogs - admin`)

    logChannel(message, "all", LogEmbed)

}


module.exports.config = {
    name: 'slowmode'
}