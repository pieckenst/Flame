const { Client, Collection } = require('discord.js');
const { loadListeners, loadCommands } = require('../utils/Loader');

class FlameClient extends Client {
    constructor(options) {
        super(options);
        this.config = require('../../config.json');
        this.listeners = new Collection();
        this.commands = new Collection();
    }
    async _launch() {
        await loadListeners(this, '../listeners/');
        await loadCommands(this, '../commands/');
        return this.login(this.config.token).catch(console.error);
    }
}

module.exports = FlameClient;
