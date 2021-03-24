/**
 * @note The function below was taken from an open-source project "Deleter" and has been modified.
 * @see https://github.com/DeleterBot/deleter-v2/
 */

const cache = {};

async function collectStatistics() {
    let needToCache = false;

    if (cache.expires > Date.now()) return Object.assign({}, { shards: cache.stats.shards }, cache.stats.stats);
    else needToCache = true;

    const shards = [];
    const script = 
    '[ this.ws.status, this.ws.ping,'
    + ' this.channels.cache.size, this.guilds.cache.size,'
    + ' this.users.cache.size, this.ws.destroyed, this.ws.reconnecting ]'

    const stats = { totalGuilds: 0, totalUsers: 0, totalChannels: 0 };
    for await (const shard of Array.from(ApiWorker.manager.shards.values())) {
        const res = await shard.eval(script);

        stats.totalGuilds += res[3] ?? 0;
        stats.totalUsers += res[4] ?? 0;
        stats.totalChannels += res[2] ?? 0;

        shards.push({ 
            id: shard.id + 1,
            ready: (res[5] || res[6]) ? false : !res[0],
            ping: res[1] < 1 ? 1 :res[1] ?? 1,
            channels: res[2] ?? 0,
            guilds: res[3] ?? 0,
            users: res[4] ?? 0
        });
    }

    if (needToCache) {
        cache.stats = { shards: shards, stats: stats };
        cache.expires = Date.now() + 15 * 1000;
    }

    return Object.assign({}, { shards }, stats);
}

module.exports = collectStatistics;