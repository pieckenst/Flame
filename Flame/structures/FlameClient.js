const { Client, Collection } = require('discord.js');
const { loadListeners, loadCommands } = require('../utils/Loader');
const MongoClient = require('mongodb').MongoClient;

class FlameClient extends Client {
    constructor(options) {
        super(options);
        this.config = require('../../config.json');
        this.mongo = new MongoClient(this.config.database, { useNewUrlParser: true, useUnifiedTopology: true });
        this.listeners = new Collection();
        this.commands = new Collection();
    }
    get database() {
        return this.mongo.db('<dbname>');
    }
    async _launch() {
        await loadListeners(this, '../listeners/');
        await loadCommands(this, '../commands/');
        return this.login(this.config.token).catch(console.error);
    }
}

module.exports = FlameClient;
