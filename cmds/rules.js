const Discord = require("discord.js")

module.exports.run = async(bot, message, args) => {
    message.delete();
    if(!message.member.roles.cache.some(role => ["Owner"].includes(role.name))) return;
    let RulesChannel = bot.guilds.cache.get("637716032106135582").channels.cache.get("637717816471978056")
    RulesChannel.bulkDelete(100)
    let ConfirmRules = new Discord.MessageEmbed()
        .setTitle("Test")
        .setDescription("Réagis pour avoir ton rôle !")
    RulesChannel.send(ConfirmRules).then(msg => msg.react("✅"))
}

module.exports.config = {
    name: 'arules'
}