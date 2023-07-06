const Discord = require("discord.js")
function logChannel(message, channel, msg) {/*action,description, footer*/
    let logChannels = message.guild.channels.cache.find(c => c.name == `${channel}`)
    if(!logChannels) return;
    logChannels.send(msg)
}

module.exports = {
    logChannel: logChannel
}