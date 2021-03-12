const { Collection } = require('discord.js');
const FlameListener = require('../structures/FlameListener');

const cooldowns = new Collection();

module.exports = class extends FlameListener {
    constructor() {
        super('MessageListener', { event: 'message' });
    }
    run(client, message) {
        const prefix = '.';

        if (message.author.bot) return;
        if (message.channel.type === 'dm' || !message.guild) return;
        if (!message.content.startsWith(prefix)) return;

        const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = client.commands.get(cmd);

        if (cooldowns.has(message.author.id) && cooldowns.get(message.author.id) === command.name) return message.react('⏱️').catch();
        if (command) {
            command.run(message, args);
            cooldowns.set(message.author.id, command.name);

            setTimeout(() => cooldowns.delete(message.author.id), command.cooldown * 1000);
        }
    }
}