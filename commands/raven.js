const { SlashCommandBuilder, userMention } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("raven")
        .setDescription("Commande pour faire chier raven."),
        async execute(interation) {
            interation.reply("<@641727070208262172> https://www.youtube.com/watch?v=17bx_uNedy0");
        }
}