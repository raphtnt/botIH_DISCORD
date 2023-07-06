const config = require("../db/config.json");

module.exports = async (bot) => {

        // STATUS SYSTEM
        let statues = [
            "IHBot - Site web COMMING SOON",
            `IHBot - En ligne sur ${bot.guilds.cache.size} serveur`,
            "IHBot - d'autre fonctionnalité a venir !"
        ]
        setInterval(function () {
            let status = statues[Math.floor(Math.random() * statues.length)]
            //      bot.user.setActivity(status, {type: "CUSTOM_STATUS"})
            bot.user.setActivity(status, {type: 'WATCHING'})
                .catch(console.error);
        }, 5000)

        const channel = bot.channels.cache.get("853340219826634772");
        if (!channel) return console.error("The channel does not exist!");
        channel.join().then(connection => {
            console.log("Successfully connected.");
            const broadcast = bot.voice.createBroadcast();
            const dispatcher = broadcast.play('http://streamingp.shoutcast.com/NRJ');
            // console.log(dispatcher)
            for (let i = 0; i < 9; i++) {
                console.log("---------------------")
            }
            // console.log(broadcast)
            connection.play(broadcast);
            broadcast.on('subscribe', dispatcher => {
                console.log("subscribe");
            });

            broadcast.on('unsubscribe', dispatcher => {
                connection.play(broadcast);
            });

        }).catch(e => {
            console.error(e);
        });

        // TICKET SYSTEM
        /*
            let TicketChannel = bot.guilds.cache.get(config.id_guild).channels.cache.get(config.ticket_channel)
            TicketChannel.bulkDelete(100).catch(console.error)
            let openTicket = new Discord.MessageEmbed()
                .setDescription("Réagissez pour ouvrir un ticket !")
                .setColor("#00ff99")
            TicketChannel.send(openTicket).then(msg => msg.react("🎟️"))
        */
}