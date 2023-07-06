const Discord = require("discord.js");
const logsChannel = require("../modules/logs");
const config = require("../db/config.json");
module.exports = async (bot, reaction, user) => {
    const message = reaction.message;
    const member = message.guild.members.cache.get(user.id);
    if (user.bot) return;
    if (
        ["🎟️", "🔒", "✅", "🆗", "🔓"].includes(reaction.emoji.name)
    ) {
        switch (reaction.emoji.name) {
            case "🎟️":
                if (reaction.message.channel.id !== config.ticket_channel) return;
                reaction.users.remove(user);
                let username = user.username;
                if (member.roles.cache.some(role => ["VIP"].includes(role.name))) {
                    // VIP
                    var catergoryID = "770765272683905076";
                } else {
                    // NON VIP
                    var catergoryID = "715703317996765204";
                }

                var getticket = await member.guild.channels.cache.find(channel => channel.name === `ticket-${username}`);
                if (getticket !== undefined) return;

                var channel = await message.guild.channels.create(`ticket-${username}`, {
                    type: "text",
                    parent: message.guild.channels.cache.get(catergoryID)
                })
                    .catch(err => {
                        message.channel.send("Error contact to administrator")
                    });
                channel.updateOverwrite(message.guild.roles.everyone, {"VIEW_CHANNEL": false})
                channel.updateOverwrite(member, {
                    "VIEW_CHANNEL": true,
                    "SEND_MESSAGES": true,
                    "ADD_REACTIONS": true
                });
                channel.updateOverwrite(message.guild.roles.cache.find(role => role.name == ["Allowed Ticket"]), {"VIEW_CHANNEL": true});
                var embedSupport = new Discord.MessageEmbed()
                    .setTitle(`Hello ${username}`)
                    .setDescription("Explain your problem here.\nExpliquez votre problème.")
                    .setColor("#bb00ff")
                channel.send(embedSupport).then(async msg => msg.react("🔒"))


                let TLogCEmbed = new Discord.MessageEmbed()
                    .setTitle(`TICKETS`)
                    .setDescription(`**Création d'un ticket**`)
                    .setColor("#89ffbd")
                    .setAuthor(username)
                    .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
                    .addField("Channel :", `${channel}`)
                    .setFooter(`IHLogs - ticket`)

                logsChannel.logChannel(message, "all", TLogCEmbed)
                logsChannel.logChannel(message, "tickets", TLogCEmbed)
                break;
            case "🔒":
                if (!message.channel.name.startsWith("ticket")) return;
                if (!member.roles.cache.some(role => role.name === "Allowed Ticket")) return;
                message.channel.delete();

                let TLogDEmbed = new Discord.MessageEmbed()
                    .setTitle(`TICKETS`)
                    .setDescription(`**Suppression d'un ticket**`)
                    .setColor("#89ffbd")
                    .setAuthor(user.username)
                    .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
                    .addField("Channel :", `${message.channel.name}`)
                    .setFooter(`IHLogs - ticket`)
                logsChannel.logChannel(message, "all", TLogDEmbed)
                logsChannel.logChannel(message, "tickets", TLogDEmbed)
                break;
            case "✅":
                if (reaction.message.channel.id !== "637717816471978056") return;
                reaction.users.remove(user);
                let role = message.guild.roles.cache.find(r => r.name === "Membre");
                if (member.roles.cache.some(r => ["Membre"].includes(r.name))) {
                    member.roles.remove(role).catch(console.error);
                    break;
                } else {
                    member.roles.add(role).catch(console.error);
                    break;
                }
            case "🆗":
                if (reaction.message.channel.id !== "778565891419013180") return;
                if (!member.roles.cache.some(role => role.name === "Infinity-Had Author")) return await reaction.users.remove(user);
                let AcceptedSugest = new Discord.MessageEmbed()
                    .setColor("#89ffbd")
                    .setFooter(`Accepter pars ${member.user.username}`)
                if (reaction.message.partial) {
                    await reaction.message.fetch().then(fullMessage => {
                        AcceptedSugest.setTitle(`Suggestions de ${fullMessage.author.username}`)
                        AcceptedSugest.setDescription(fullMessage.content)
                    })
                } else {
                    AcceptedSugest.setTitle(`Suggestions de ${reaction.message.author.username}`)
                    AcceptedSugest.setDescription(reaction.message.content)
                }

                let AcceptedSugestChannel = message.guild.channels.cache.find(c => c.name == `✅suggestions`)
                if (!AcceptedSugestChannel) return;
                AcceptedSugestChannel.send(AcceptedSugest)
                await reaction.message.delete()
                break;
            case "🔓":
                reaction.users.remove(user);
                let getRole = message.guild.roles.cache.find(r => r.name === "BAN");
                let userID = message.channel.name;
                // let getUser = bot.guild.members.cache.get(userID);
                // let getUser = bot.users.cache.find(user => user.id === userID);
                // let getUser = bot.guilds.client.user.fetch(userID)
                // console.log(getRole)
                // console.log(userID)
                // console.log(getUser)
                // getUser.roles.remove(getRole)
                break;
        }
    }
}