const Discord = require("discord.js")
const logsChannel = require("../modules/logs.js")

module.exports.run = async(bot, message, args) => {

    /*
    Commande : = !addrole promote/demote     username          ranks
    Commande : = !addrole    <args0>         <args1>          [args2]

     */

    message.delete()
    console.log(message.member.user.id)
    // if(!message.member.roles.cache.some(role => ["Owner"].includes(role.name)) || message.member.user.id !== "323057664399507457") return error(1);
    /*
    raphtnt : 323057664399507457
    Kur0Fr : 421268639748980737
     */
    console.log(message.member.roles.cache.some(role => ["Owner"].includes(role.name)))
    // if(!["421268639748980737"].includes(message.member.user.id) || !message.member.roles.cache.some(role => ["Owner"].includes(role.name))) return error(1);
    if(!["323057664399507457"].includes(message.member.user.id)) return error(1);
    let dname = message.mentions.members.first();
    if(args[1] !== dname.user.username) {
        let displayname = dname.user.username;
        let rank = message.mentions.roles.first();
                if(args[2] !== rank && ["Owner", "STAFF"].includes(rank.name) !== true || message.member.user.id === "323057664399507457") {
                        if(rank !== undefined && message.mentions.members.first().roles.cache.some(r=>[rank.name].includes(r.name))) {
                            message.mentions.members.first().roles.remove(rank).catch(console.error);
                            let RLogEmbed = new Discord.MessageEmbed()
                                .setTitle(`ROLES`)
                                .setDescription(`**Retrogradation du role ${rank.name} sur ${displayname}**`)
                                .setColor("#ff0000")
                                .setAuthor(message.member.user.username)
                                .setThumbnail(message.member.user.avatarURL({dynamic: true, size: 512}))
                                .setFooter(`IHLogs - Administrations`)
                            logsChannel.logChannel(message, "all", RLogEmbed)
                        } else {
                            message.mentions.members.first().roles.add(rank).catch(console.error);
                            let ALogEmbed = new Discord.MessageEmbed()
                                .setTitle(`ROLES`)
                                .setDescription(`**Promotions au role ${rank.name} sur ${displayname}**`)
                                .setColor("#37ff00")
                                .setAuthor(message.member.user.username)
                                .setThumbnail(message.member.user.avatarURL({dynamic: true, size: 512}))
                                .setFooter(`IHLogs - Administrations`)
                            logsChannel.logChannel(message, "all", ALogEmbed)
                        }

                }else {
                    error(0)
                }

            }else {
                error(0)
    }


    function error(params) {
                switch (params) {
                    case 0:
                        let ErrorEmbed = new Discord.MessageEmbed()
                            .setTitle("Error !")
                            .setDescription(`Commands : !role <@username> <@ranks>`)
                            .setAuthor(message.author.tag)
                            .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 512}))
                        message.channel.send(ErrorEmbed)
                        break;
                    case 1:
                        let ErrorPermsEmbed = new Discord.MessageEmbed()
                            .setTitle("Error !")
                            .setDescription(`You don't have permission for this command !`)
                            .setAuthor(message.author.tag)
                            .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 512}))
                        message.channel.send(ErrorPermsEmbed)
                        break;
                }
    }

}

module.exports.config = {
    name: 'role'
}