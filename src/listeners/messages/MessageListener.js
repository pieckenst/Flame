const FlameListener = require('../../structures/FlameListener');
const CommandsExecutorService = require('../../services/CommandExecutorService');

class MessageListener extends FlameListener {
    constructor() {
        super('MessageListener', { event: 'message' });
    }
    async run(client, message) {
        const executor = new CommandsExecutorService(message, client);
        return executor.runCommand();
    }
}

module.exports = MessageListener;