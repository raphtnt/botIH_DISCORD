module.exports = async (bot, menu) => {

    if(menu.values[0] === "test") {
        menu.channel.send("Ceci est un pure test !")
        console.log(`Click : ${menu.clicker.user.username} (${menu.clicker.user.id})`)
        // console.log(menu.clicker)
        console.log(menu)
    }

    if(menu.values[0] === "wsh") {
        menu.channel.send("Ceci est un wsh !")
    }

    if(menu.values[0] === "alors") {
        menu.channel.send("Ceci est un alors ?")
    }

}