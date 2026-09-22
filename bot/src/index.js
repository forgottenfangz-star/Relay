require("dotenv").config();

const { Client, Events, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const token = process.env.DISCORD_TOKEN;

if (!token) {
  throw new Error("DISCORD_TOKEN is missing. Add it to your environment before starting Relay.");
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Relay is online as ${readyClient.user.tag}.`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply({ content: "Relay is online.", ephemeral: true });
    return;
  }

  if (interaction.commandName !== "relay") return;

  const area = interaction.options.getString("area", true);
  const messages = {
    security: {
      title: "Security",
      text: "Anti-raid, anti-nuke, and anti-spam controls are the first Relay protection layer.",
    },
    watchguard: {
      title: "Watchguard",
      text: "Your server rules, applied automatically with evidence and a clear audit trail.",
    },
    appeals: {
      title: "Appeals",
      text: "A fair review path for bans, with the original enforcement context attached.",
    },
    status: {
      title: "Relay status",
      text: "Relay is connected and ready for its first protection rules.",
    },
  };

  const message = messages[area] ?? messages.status;
  const embed = new EmbedBuilder()
    .setColor(0xc8fa52)
    .setTitle(`Relay · ${message.title}`)
    .setDescription(message.text)
    .setFooter({ text: "Your server. Protected automatically." });

  await interaction.reply({ embeds: [embed], ephemeral: true });
});

client.login(token);
