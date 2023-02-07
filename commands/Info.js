const { SlashCommandBuilder, userMention } = require("@discordjs/builders"); // Slash Command Thingy

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Get Information About the Bot!"),
        async execute(interation) {
            interation.reply("**__Thank you for using Hekapoo Bot! \Hekapoo bot is one of my project that I enjoy working on! Even though the project is not closed source for the most part since we use commands that are related to Purple Side. I still like it and I hope you do! Project started in November 21st, 2020__** ");
        }
}