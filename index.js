require('dotenv').config();
let token =  process.env.TOKEN;
const { Client, GatewayIntentBits } = require('discord.js');
console.log(token);


// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
client.login(token);