const path = require('path');
const fs = require('fs').promises;
const FlameListener = require('../structures/FlameListener');
const FlameCommand = require('../structures/FlameCommand');

async function loadListeners(client, dir = '') {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdir(filePath);
    for (let file of files) {
        const stat = await fs.lstat(path.join(filePath, file));
        if (stat.isDirectory()) {
            await loadListeners(client, path.join(dir, file));
        }
        if (file.endsWith('.js')) {
            const Listener = require(path.join(filePath, file));
            if (Listener.prototype instanceof FlameListener) {
                const listener = new Listener();
                client.listeners.set(listener.name, listener);
                client.on(listener.emitter, listener.run.bind(listener, client));
            }
        }
    }
}

async function loadCommands(client, dir = '') {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdir(filePath);
    for (let file of files) {
        const stat = await fs.lstat(path.join(filePath, file));
        if (stat.isDirectory()) {
            await loadCommands(client, path.join(dir, file));
        }
        if (file.endsWith('.js')) {
            const Command = require(path.join(filePath, file));
            if (Command.prototype instanceof FlameCommand) {
                const cmd = new Command();
                client.commands.set(cmd.name, cmd);
                cmd.aliases.forEach((alias) => client.commands.set(alias, cmd));
            }
        }
    }
}

module.exports = {
    loadListeners,
    loadCommands
}