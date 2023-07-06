const Discord = require("discord.js")
// const logs = require("../modules/logs")
const { logChannel } = require('../modules/logs')

module.exports.run = async(bot, message, args) => {
    message.delete()
    // if(!message.member.hasPermission("ADMINISTRATOR")) return;
    if(!message.member.roles.cache.some(role => ["Owner"].includes(role.name))) return;

    if(args[1] === undefined) {
        let ErrorEmbed = new Discord.MessageEmbed()
            .setTitle("Error !")
            .setDescription(`Commands : !test <name category> <name channel>`)
            .setAuthor(message.author.tag)
            .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 512}))
        message.channel.send(ErrorEmbed)
        return;
    }

    var categorie = await message.guild.channels.create(`${args[0]}`, {type: "category"})
        .catch(err => {
            message.channel.send("Error contact to administrator")
        });

    var channelannonce = await message.guild.channels.create(`Annonce`, {type: "news", parent: message.guild.channels.cache.get(`${categorie.id}`)})
        .catch(err => {
            message.channel.send("Error contact to administrator")
        });
    channelannonce.updateOverwrite(message.guild.roles.everyone, {
        "VIEW_CHANNEL": true,
        "SEND_MESSAGES": false,
        "ADD_REACTIONS": true
    });


    var channeltext = await message.guild.channels.create(`${args[1]}`, {type: "text", parent: message.guild.channels.cache.get(`${categorie.id}`)})
        .catch(err => {
            message.channel.send("Error contact to administrator")
        });

    var channelvoice = await message.guild.channels.create(`${args[1]}`, {type: "voice", parent: message.guild.channels.cache.get(`${categorie.id}`)})
        .catch(err => {
            message.channel.send("Error contact to administrator")
        });

    let LogEmbed = new Discord.MessageEmbed()
        .setTitle(`Categorie créer`)
        .setDescription(`**Informations**`)
        .setColor("#ff0000")
        .setAuthor(message.author.tag)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 512}))
        .addField("Nom", `${args}`, true)
        .addField("ID", `${categorie.id}`, true)
        .setFooter(`IHLogs - Categorie`)

    logChannel(message, "test", LogEmbed)
}

module.exports.config = {
    name: 'test',
}