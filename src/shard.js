const { ShardingManager } = require('discord.js');
const { join } = require('path')
const config = require('../config.json');
const Manager = new ShardingManager(join(__dirname, 'index.js'), {
    token: config.token,
    totalShards: parseInt(config.shards) || 'auto',
    respawn: true
});

Manager.spawn(Manager.totalShards, 5500, 400000);
