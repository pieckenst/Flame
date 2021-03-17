const FlameListener = require('../../structures/FlameListener');
const CommandsExecutorService = require('../../services/CommandExecutorService');

module.exports = class extends FlameListener {
    constructor() {
        super('MessageUpdateListener', { event: 'messageUpdate' });
    }
    run(client, oldMessage, newMessage) {

        const executor = new CommandsExecutorService(newMessage, client);
        return executor.runCommand();
    }
}