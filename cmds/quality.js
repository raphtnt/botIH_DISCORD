const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    message.delete();
    let voiceQuality = args[0] * 1000;
    let mNC = message.member.voice.channel.name.split(" "); // Member channel split
    let getInfoGuild = bot.guilds.cache.get("637716032106135582");
    let getVIP = message.member.roles.cache.find(role => role.id === "770763297418903603");

    if (args[0] === undefined || isNaN(args[0])) return;

    if (mNC[1] === message.member.user.username && getVIP) {
        if(getInfoGuild.premiumTier === 0 && voiceQuality >= 8000 && voiceQuality <= 96000) {
            await message.member.voice.channel.setBitrate(voiceQuality)
            embedMessage("successfully", message, voiceQuality)
        }else if(getInfoGuild.premiumTier === 1 && voiceQuality >= 8000 && voiceQuality <= 128000){
            await message.member.voice.channel.setBitrate(voiceQuality)
            embedMessage("successfully", message, voiceQuality)
        }else if(getInfoGuild.premiumTier === 2 && voiceQuality >= 8000 && voiceQuality <= 256000){
            await message.member.voice.channel.setBitrate(voiceQuality)
            embedMessage("successfully", message, voiceQuality)
        }else if(getInfoGuild.premiumTier === 3 && voiceQuality >= 8000 && voiceQuality <= 384000){
            await message.member.voice.channel.setBitrate(voiceQuality)
            embedMessage("successfully", message, voiceQuality)
        }else {
            console.log(getInfoGuild.premiumTier)
            switch (getInfoGuild.premiumTier) {
                case 0:
                    embedMessage("voiceLimit", message, "8 à 96")
                    break;
                case 1:
                    embedMessage("voiceLimit", message, "8 à 128")
                    break;
                case 2:
                    embedMessage("voiceLimit", message, "8 à 256")
                    break;
                case 3:
                    embedMessage("voiceLimit", message, "8 à 384")
                    break;
                default:
                    console.log("VOICELIMIT PAS DEFINI !!! | quality.js >> ligne:41 |")
                    break;
            }
        }
    } else {
        embedMessage("permission", message, voiceQuality)
    }

}

function embedMessage(params, message, voiceQuality) {
    let messageEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 512}))
        .setFooter("IHChannel")

    switch (params) {
        case "successfully":
            messageEmbed.setDescription(`Vous venez de changer la qualité de votre channel à ${voiceQuality / 1000} kbps`)
                .setColor("#08ff00")
            break;
        case "voiceLimit":
            messageEmbed.setDescription(`La limite de qualité audio possible est de ${voiceQuality} kbps`)
                .setColor("#ff7700")
            break;
        case "permission":
            let getVIP = message.member.roles.cache.find(role => role.id === "770763297418903603");
            let vip = getVIP ? "Vous n'êtes pas dans votre channel !" : "Vous n'êtes pas VIP";
            messageEmbed.setDescription(`**Vous n'avez pas la permission de changer la quality de ce channel!**\n*${vip}.*`)
                .setColor("#ff0000")
            break;
    }
    message.channel.send(messageEmbed)
}

module.exports.config = {
    name: 'quality'
}