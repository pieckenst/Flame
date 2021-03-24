const FlameListener = require('../structures/FlameListener');
const MuteService = require('../services/MuteService');

class ReadyListener extends FlameListener {
    constructor() {
        super('ReadyListener', { event: 'ready' });
    }
    async run(client) {
        await client.mongo.connect();
        client.user.setActivity('https://github.com/TheFerryn/Flame', { type: 3 });

        /**
         * Подгрузка всех мьютов, напоминаний и кулдаунов после перезапуска бота.
         */

        const mutes = await client.database.collection('mutes').find().toArray();
        mutes.forEach((mute) => new MuteService(client).handle(mute));

        return console.log(`${client.user.tag}: Бот был успешно запущен.`);
    }
}

module.exports = ReadyListener;