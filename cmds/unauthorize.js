const Discord = require("discord.js")

module.exports.run = async(bot, message, args) => {
    let mNC = message.member.voice.channel.name.split(" "); // Member channel split
    if (mNC[1] === message.member.user.username) {
        if(message.mentions.members.first()) {
            let member = message.mentions.members.first();
            message.member.voice.channel.updateOverwrite(member, {"CONNECT": false})
            message.channel.send(`Vous venez de refuser ${member} à rejoindre votre channel!`)

        }else {
            message.channel.send("Veuillez mentionnez une personne ! (!authorize @lapersonne)")
        }

    }else {
        message.channel.send("Ce n'est pas votre channel!");
    }

}

module.exports.config = {
    name: 'unauthorize'
}