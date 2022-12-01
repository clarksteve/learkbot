// Import 
const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');

// Make a new client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Collection for the commands
client.commands = new Collection();

// Import all commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] the command at ${filePath} is missing a "data" or "execute" property`)
  }
}

// Run this code when the client is ready
// Use c as the event parameter
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Handling interaction events
client.on(Events.InteractionCreate, interaction => {
  if(!interaction.isChatInputCommand()) return;
  console.log(interaction)
}

// Log in to Discord with your client's token
client.login(token);
