const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let d = new Date();
    let t = new Date(d.getTime() + 30*60000);
    let strawpollEmbed = new Discord.MessageEmbed()
        .setAuthor(`Vote créer par ${message.author.tag}`)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 512}))
        .setTitle(`IH - StrawPoll`)
        .setDescription(`Etes vous pour ou contre un system de level ?`)
        .setColor("GOLD")
        .setFooter(`Strawpoll - Fin du vote le ${t}`)

    message.channel.send(strawpollEmbed).then(async msg => {
        msg.react("✅");
        msg.react("❌");

        const filter = (reaction, user) => ['✅','❌'].includes(reaction.emoji.name) && !user.bot;

/*        const filter = (reaction, user) => {
            return reaction.emoji.name === '✅' || reaction.emoji.name === '❌';
        };*/

        const collector = msg.createReactionCollector(filter, { time: 10000, dispose: true });

        let count = new Map();
        count.set('ok', 0);
        count.set('nope', 0);
        collector.on('collect', (reaction, user) => {
            if(reaction.emoji.name === '✅') count.set('ok', count.get('ok') + 1);
            if(reaction.emoji.name === '❌') count.set('nope', count.get('nope') + 1);
        });

        collector.on('remove', (reaction, user) => {
            if(reaction.emoji.name === '✅') count.set('ok', count.get('ok') - 1);
            if(reaction.emoji.name === '❌') count.set('nope', count.get('nope') - 1);
        });

        collector.on('end', collected => {
            console.log(`Le vote à ${collected.size} vote au total\n Il a ${count.get('ok')} ✅ \n Il a ${count.get('nope')} ❌`)

            let strawpollEmbedEnd = new Discord.MessageEmbed()
                .setAuthor(`Vote créer par ${message.author.tag}`)
                .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 512}))
                .setTitle(`IH - StrawPoll`)
                .setFooter(`Le strawpoll est terminé !`)

            let result;
            if(count.get('ok') === count.get('nope')) {
                result = "est à **Egalite**\n *Le staff prendra une descision !*"
                strawpollEmbedEnd.setColor('ORANGE')
            }else if (count.get('ok') === Math.max(count.get('ok'), count.get('nope'))) {
                result = "à été **accepter**";
                strawpollEmbedEnd.setColor('GREEN')
            }else {
                result = "à été **refuser**";
                strawpollEmbedEnd.setColor('RED')
            }

        strawpollEmbedEnd.setDescription(`Etes vous pour ou contre un system de level ?\n\n
                Le vote ${result}
                \n
                Il y a eu ${count.get('ok')} pour
                Il y a eu ${count.get('nope')} contre\n`)

            msg.edit(strawpollEmbedEnd)
        });

    })

/*
    const filter = (reaction, user) => {
        return reaction.emoji.name === '✅' || reaction.emoji.name === '❌';
    };

    const collector = message.createReactionCollector(filter, { time: 15000 });

    var okCount = 0;
    var nopeCount = 0;
    let count = new Map();
    count.set('ok', 0);
    count.set('nope', 0);
    collector.on('collect', (reaction, user) => {
        console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        if(reaction.emoji.name === '✅') count.set('ok', count.get('ok') + 1);
        if(reaction.emoji.name === '❌') count.set('nope', count.get('nope') + 1);
    });

    collector.on('end', collected => {
        console.log(`${collected.size}`);
        console.log(`Le vote à ${collected.size} vote au total\n Il a ${count.get('ok')} ✅ \n Il a ${count.get('nope')} ❌`)
        console.log(`${count.get('ok')}`);
    });
*/


}

module.exports.config = {
    name: 'strawpoll'
}