const Discord = require("discord.js")
const { logChannel } = require('../modules/logs')

module.exports.run = async(bot, message, args) => {
    message.delete()
    if(Number.isInteger(args[0])) return;
    if(args[0] > 100) return;
    if(!message.member.roles.cache.some(role => ["Owner", "STAFF"].includes(role.name))) return;
    message.channel.bulkDelete(args[0]).catch(console.error)
}


module.exports.config = {
    name: 'delmsg'
}