const FlameClient = require('./structures/FlameClient');
const { Intents } = require('discord.js');

const client = new FlameClient({ intents: Intents.ALL, disabledMentions: 'everyone '});
client._launch();