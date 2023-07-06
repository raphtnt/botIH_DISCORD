const Discord = require("discord.js")
const { MessageMenuOption, MessageMenu, MessageActionRow, MessageButton } = require("discord-buttons")

module.exports.run = async (bot, message, args) => {
    // const disbut = require('discord-buttons')(bot);

    const option = new MessageMenuOption()
        .setLabel("Test")
        .setDescription("Take your role !")
        .setEmoji("✅")
        .setValue("test")

    const option1 = new MessageMenuOption()
        .setLabel("Wsh")
        .setDescription("Take your role !")
        .setEmoji("🔐")
        .setValue("wsh")

    const option2 = new MessageMenuOption()
        .setLabel("Alors")
        .setDescription("Take your role !")
        .setValue("alors")

    const Menu = new MessageMenu()
        .setID('menu1')
        .setPlaceholder("Take your role game :) :D !")
        .addOption(option)
        .addOption(option1)
        .addOption(option2)
        .setMaxValues(2)


    const Row1 = new MessageActionRow()
        .addComponent(Menu)

    await message.channel.send("Test :D", {components: [Row1]})
    // await message.channel.send("Test :D", {component: Menu})



}

module.exports.config = {
    name: 'roletest'
}