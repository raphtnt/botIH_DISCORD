const Discord = require("discord.js")

module.exports.run = async(bot, message, args) => {

    message.delete()
    if(!message.member.roles.cache.some(role => ["Owner"].includes(role.name))) return;

    let openTicket = new Discord.MessageEmbed()
        .setDescription("React for open a ticket")

    let SendChannel = bot.guilds.cache.get("637716032106135582").channels.cache.get("770693795858743296");
    SendChannel.send(openTicket).then(msg=> msg.react("🎟️"))

}

module.exports.config = {
    name: 'openticket'
}