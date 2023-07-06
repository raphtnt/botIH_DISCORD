const Discord = require("discord.js");
const config = require("../db/config.json");
module.exports = async (bot, message) => {

        if (message.author.bot) return;
        if (message.channel.type === "dn") return;

        let prefix = config.prefix;
        let messageArray = message.content.split(" ");
        let command = messageArray[0];
        let args = messageArray.slice(1);

        let commandFile = bot.commands.get(command.slice(prefix.length))
        if (commandFile) commandFile.run(bot, message, args)

        /*    if (message.channel.id === "779009771407015956") {
                let logChannelsss = message.guild.channels.cache.find(c => c.name == `all`)
                logChannelsss.send(message.content);
            }*/

        if (message.channel.id === "778565891419013180") {
            await message.react("✅");
            await message.react("❌");
            await message.react("🆗");
        }

        if(message.channel.id === "780448323819667457" && !message.author.bot) {
            message.delete()
            let staffChannel = message.guild.channels.cache.find(c => c.id === `637716032106135584`);
            let member = message.guild.members.cache.get(message.author.id);
            let getDebanChannel = await member.guild.channels.cache.find(channel => channel.name === `${message.author.id}`);
            if(getDebanChannel !== undefined) return;

            var channelDeban = await message.guild.channels.create(`${message.author.id}`, {type: "text", parent: message.guild.channels.cache.get("780448204520030228")})
                .catch(err => {
                    message.channel.send("Error contact to administrator")
                });
            channelDeban.updateOverwrite(message.guild.roles.everyone, {"VIEW_CHANNEL": false})
            channelDeban.updateOverwrite(member, {
                "VIEW_CHANNEL": true,
                "SEND_MESSAGES": false,
                "ADD_REACTIONS": false
            });
            channelDeban.updateOverwrite(message.guild.roles.cache.find(role => role.name == ["Allowed Unban"]), {"VIEW_CHANNEL": true});
            var embedDeban = new Discord.MessageEmbed()
                .setTitle(`Demande de déban de ${message.author.username}`)
                .setDescription(message.content)
                .setColor("#ff0077")
            channelDeban.send(embedDeban).then(async msg => msg.react("🔓"))
        }
}