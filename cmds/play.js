const Discord = require("discord.js")
const ytdl = require("ytdl-core")

// NRJ Belgique -->    http://streamingp.shoutcast.com/NRJ

module.exports.run = async (bot, message, args) => {
    console.log("START PLAY !!!!");
    if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        // connection.play(ytdl('https://www.youtube.com/watch?v=Cj25UpcBDt0', { filter: 'audioonly' }));
        const broadcast = bot.voice.createBroadcast();
        const dispatcher = broadcast.play('http://streamingp.shoutcast.com/NRJ');
        connection.play(broadcast);
        broadcast.on('subscribe', dispatcher => {
            console.log('New broadcast subscriber!');
        });

        broadcast.on('unsubscribe', dispatcher => {
            console.log('Channel unsubscribed from broadcast :(');
        });
    } else {
        message.reply('You need to join a voice channel first!');
    }

    console.log("END PLAY !!!!");

}

module.exports.config = {
    name: 'play'
}