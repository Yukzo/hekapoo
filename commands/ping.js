const { SlashCommandBuilder, userMention } = require("@discordjs/builders"); // Slash Command Thingy

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Simple Test Command."),
        async execute(interation) {
            interation.reply("**__Ping ! Command Succesful__**");
        }
}