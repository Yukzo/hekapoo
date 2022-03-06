// Loads dependencies and configs
require("dotenv").config();
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Client, Intents, Collection } = require("discord.js");

// Gives Discord Intents to the bot
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES
	]
});

// Loads only .js files from the commands folder
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

// Other load commands
const commands = [];

// Create Collection
client.commands = new Collection();

// Command Handler
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}

// Bootstrap Thingies
client.once("ready", () => {
	console.log("The Nevermore Show arrives !");

	const CLIENT_ID = client.user.id;

	const rest = new REST({
		version: "9"
	}).setToken(process.env.TOKEN);

	(async () => {
		try {
			if (process.env.ENV === "production") {
				await rest.put(Routes.applicationCommands(CLIENT_ID), {
					body: commands
				});
				console.log("Successfully registered commands globally.");
			} else {
				await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {
					body: commands
				});
				console.log("Successfully registered commands locally.");
			}
		} catch (err) {
			if (err) console.error(err);
		}
	})();
});

// Allows user to use the commands
client.on("interactionCreate", async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch(err) {
		if (err) console.error(err);

		await interaction.reply({
			content: "__An error occurred while executing that command. Contact Yukzo to report this bug !__",
			ephemeral: true,
		});
	}
});

// Login the bot
client.login(process.env.TOKEN);