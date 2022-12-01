// Import 
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');

// Make a new client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Run this code when the client is ready
// Use c as the event parameter
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

