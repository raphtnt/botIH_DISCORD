module.exports = async (bot, oldMember, newMember) => {
    let channelvoice;
    if (newMember.bot) return;

    if (newMember.channelID === "778310670319484983") {

        if (newMember.member.roles.cache.some(r => r.id === "778600099507863572")) {
            channelvoice = await random(newMember, "voice", `🤵 ${newMember.member.displayName}`, "778309393581867058")
            channelvoice.setPosition(0)
        } else {
            channelvoice = await random(newMember, "voice", `🎧 ${newMember.member.displayName}`, "778309393581867058")
        }

        await newMember.member.voice.setChannel(channelvoice.id)

    } else if (newMember.channelID === "637719550443651112") {
        if (newMember.member.roles.cache.some(r => r.id === "637716238113701898")) { // Owner
            channelvoice = await random(newMember, "voice", `🦊 Bureau de ${newMember.member.displayName}`, "637718152490516491")
            channelvoice.setPosition(1)
        } else if (newMember.member.roles.cache.some(r => r.id === "637716279712677933")) { // STAFF
            channelvoice = await random(newMember, "voice", `🕵️‍ Bureau de ${newMember.member.displayName}`, "637718152490516491")
        } else if (newMember.member.roles.cache.some(r => r.id === "770766829383450684")) { // SUPPORT
            channelvoice = await random(newMember, "voice", `🔎 Bureau de ${newMember.member.displayName}`, "637718152490516491")
        } else if (newMember.member.roles.cache.some(r => r.id === "794626616097112111")) { // DEVELOPER
            channelvoice = await random(newMember, "voice", `‍🔧 Bureau de ${newMember.member.displayName}`, "637718152490516491")
        } else {
            channelvoice = await random(newMember, "voice", `🎧 Bureau de ${newMember.member.displayName}`, "637718152490516491")
        }
        await newMember.member.voice.setChannel(channelvoice.id)
    } else if (newMember.channelID === "794622940641099776") {
        channelvoice = await random(newMember, "voice", `🎧 ${newMember.member.displayName}`, "637718667760500767")
        await newMember.member.voice.setChannel(channelvoice.id)
    }

    if (newMember.channelID !== oldMember.channelID) {
        if (oldMember.channel && oldMember.guild.channels.cache.find(channel => ["778309393581867058", "637718152490516491", "637718667760500767"].includes(oldMember.channel.parentID)) && !(["778310670319484983", "637719550443651112", "794622940641099776"].includes(oldMember.channelID)) && oldMember.channel.members.size === 0) {
            await oldMember.channel.delete();
        }
    }
}

async function random(newMember, types, name, idCategory) {
    return await newMember.guild.channels.create(name, {
        type: types,
        parent: newMember.guild.channels.cache.find(channel => channel.id === idCategory)
    }).catch(err => {
        console.log("Error contact to administrator")
    });
}