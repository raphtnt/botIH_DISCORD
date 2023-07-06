const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let mName = message.mentions.members.first()
    let mNC = message.member.voice.channel.name.split(" "); // Member channel split

    if (args[0] === undefined) return;
    if (mName === undefined) return;
    if (mName.voice.channelID === null) return;
    // console.log(message.member.voice.channel)

    if (mNC[1] === message.member.user.username) {
        if (message.member.voice.channelID === mName.voice.channelID) {
            await mName.voice.kick()
            embedMessage("successfully", message, mName)
        } else {
            embedMessage("channel_different", message, mName)
        }
    } else {
        embedMessage("permission", message, mName)
    }

}

function embedMessage(params, message, mName) {
    let messageEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 512}))
        .setFooter("IHChannel")

    switch (params) {
        case "successfully":
            messageEmbed.setDescription(`Vous venez de kick ${mName}`)
                .setColor("#08ff00")
            break;
        case "channel_different":
            messageEmbed.setDescription(`Vous ne pouvez pas disconnect cette personne car il n'est pas dans le meme channel que vous !`)
                .setColor("#ff0000")
            break;
        case "permission":
            messageEmbed.setDescription(`Vous n'avez pas la permission de disconnect cette personne !`)
                .setColor("#ff0000")
            break;
    }
    message.channel.send(messageEmbed)
}

module.exports.config = {
    name: 'disconnect'
}