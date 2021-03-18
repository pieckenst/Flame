const FlameListener = require('../structures/FlameListener');

class ReadyListener extends FlameListener {
    constructor() {
        super('ReadyListener', { event: 'ready' });
    }
    run(client) {
        client.mongo.connect();

        client.user.setActivity('https://github.com/TheFerryn/Flame', { type: 3 });
        return console.log(`${client.user.tag}: Бот был успешно запущен.`);
    }
}

module.exports = ReadyListener;