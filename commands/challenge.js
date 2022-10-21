const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

// app.use(express.json());
let challenge = "";
function getChallenge() {
  axios
    .get(
      "https://www.codewars.com/api/v1/code-challenges/5277c8a221e209d3f6000b56"
    )
    .then((response) => {
      console.log(response.data.description);
      challenge = response.data.description;
    });
}

console.log("outside of function");
console.log(getChallenge());

module.exports = {
  data: new SlashCommandBuilder()
    .setName("challenge")
    .setDescription("Replies with a coding challenge"),
  async execute(interaction) {
    await interaction.channel.send(challenge);
    await interaction.reply("there should be a challenge here");
  },
};
