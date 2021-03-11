const FlameCommand = require('../structures/FlameCommand');

module.exports = class extends FlameCommand {
    constructor() {
        super('ping', {
            description: 'Показывает задержу бота.',
            usage: 'ping',
            aliases: [],
            cooldown: 0 
        });
    }
    run() {};
}