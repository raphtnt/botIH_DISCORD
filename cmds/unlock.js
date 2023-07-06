const Discord = require("discord.js")

module.exports.run = async(bot, message, args) => {
    let mNC = message.member.voice.channel.name.split(" "); // Member channel split

    if (mNC[1] === message.member.user.username) {
        message.member.voice.channel.updateOverwrite(message.guild.roles.cache.find(v => v.id === "637716852830765077"), {"CONNECT": true})
        message.channel.send("Vous venez de dévérouillez votre channel!")

    }else {
        message.channel.send("Ce n'est pas votre channel!");
    }

}

module.exports.config = {
    name: 'unlock'
}