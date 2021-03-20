const FlameListener = require('../../structures/FlameListener');
const { GuildSchema } = require('../../utils/Schemas');

class GuildCreateListener extends FlameListener {
    constructor() {
        super('GuildCreateListener', { event: 'guildCreate' });
    }
    run(client, guild) {
        return client.database.collection('guilds').updateOne({ guildID: guild.id }, { '$set': GuildSchema }, { upsert: true });
    }
}

module.exports = GuildCreateListener;