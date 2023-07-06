const Discord = require("discord.js")

module.exports.run = async(bot, message, args) => {
    if(!message.member.roles.cache.some(role => ["Owner"].includes(role.name))) return;
    let UserEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 512}))
        .addField("Nom de l'utilisateur", `${message.author.username}`)
        .addField("Tag", message.author.discriminator)
        .addField("ID", message.author.id)
        .addField("Status", message.author.presence.status)
        .addField("Compte créer le", message.author.createdAt)
        .setFooter("Information sur vous")

    message.delete()
    message.channel.send(UserEmbed)
}

module.exports.config = {
    name: 'userinfo'
}