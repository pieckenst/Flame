const { ShardingManager } = require('discord.js');
const { join } = require('path')
const config = require('../config.json');

const FlameApiWorker = require('../api/structures/FlameApiWorker');

const Manager = new ShardingManager(join(__dirname, 'index.js'), {
    token: config.token,
    totalShards: parseInt(config.shards) || 'auto',
    respawn: true
});

const api = new FlameApiWorker(Manager);

Manager.spawn(Manager.totalShards, 5500, 400000);
Manager.on('shardCreate', (shard) => console.log(`[Shard => #${shard.id}] Shard was successfully spawned.`));

api.start();

