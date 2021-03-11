const FlameListener = require('../structures/FlameListener');

module.exports = class extends FlameListener {
    constructor() {
        super('ReadyListener', { event: 'ready' });
    }
    run(client) {
        client.user.setActivity('https://github.com/TheFerryn/Flame', { type: 3 });
        return console.log(`${client.user.tag}: Бот был успешно запущен.`);
    }
}