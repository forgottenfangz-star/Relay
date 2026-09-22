require("dotenv").config();

const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID;

if (!token || !clientId) {
  throw new Error("DISCORD_TOKEN and DISCORD_CLIENT_ID are required to register Relay commands.");
}

const commands = [
  new SlashCommandBuilder().setName("ping").setDescription("Check whether Relay is online."),
  new SlashCommandBuilder()
    .setName("relay")
    .setDescription("Open a Relay overview.")
    .addStringOption((option) =>
      option
        .setName("area")
        .setDescription("Choose a Relay area.")
        .setRequired(true)
        .addChoices(
          { name: "Security", value: "security" },
          { name: "Watchguard", value: "watchguard" },
          { name: "Appeals", value: "appeals" },
          { name: "Status", value: "status" },
        ),
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

async function registerCommands() {
  const route = guildId
    ? Routes.applicationGuildCommands(clientId, guildId)
    : Routes.applicationCommands(clientId);

  await rest.put(route, { body: commands });
  console.log(`Registered ${commands.length} Relay commands ${guildId ? "for the development server" : "globally"}.`);
}

registerCommands().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
