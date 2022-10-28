require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const cron = require('cron');
const axios = require('axios')

let token = process.env.TOKEN;
let GUILD_ID = process.env.GUILD
let CHANNEL_GENERAL = process.env.CHANNEL_GENERAL

const {
  Client,
  Events,
  GatewayIntentBits,
  ApplicationCommandPermissionType,
} = require("discord.js");

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Map();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

let challenge = "";
function getChallenge() {
  console.log("here")
  axios
    .get(
      "https://www.codewars.com/api/v1/code-challenges/5277c8a221e209d3f6000b56"
    )
    .then((response) => {
      console.log(response.data.description);
      challenge = response.data.description;
    }); 
}

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, () => {
  console.log("Ready!");

  let getCodeWarsChallenge = new cron.CronJob('00 00 09 * * 1-5', () => {
    getChallenge()
    console.log(challenge)
  })

  let scheduleNoCoding = new cron.CronJob('05 00 09 * * 0,6', () => {
    const guild = client.guilds.cache.get(GUILD_ID)
    const channel = guild.channels.cache.get(CHANNEL_GENERAL);
    channel.send("Go back to sleep, there is no coding challenge today");
  })
  
  let scheduledMessage = new cron.CronJob('05 00 09 * * *', () => {
    const guild = client.guilds.cache.get(GUILD_ID)
    const channel = guild.channels.cache.get(CHANNEL_GENERAL);
    channel.send(challenge);
  });

  scheduleNoCoding.start()
  getCodeWarsChallenge.start()
  scheduledMessage.start()
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction);

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// Login to Discord with your client's token
client.login(token);

// ----------------------------------------------
