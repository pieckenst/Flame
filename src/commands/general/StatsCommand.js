const FlameCommand = require('../../structures/FlameCommand');
const Discord = require('discord.js');
const { fromNow, format } = require('../../utils/Functions');

class StatsCommand extends FlameCommand {
    constructor() {
        super('stats', {
            description: 'Возвращает статистику бота.',
            category: 'general',
            cooldown: 3,
            usage: 'stats [shards/nodes]',
            aliases: []
        })
    }
    async run(message, args) {
        const promises = [
            await message.client.shard.fetchClientValues('guilds.cache.size'),
            await message.client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
            await message.client.shard.fetchClientValues('channels.cache.size'),
            await message.client.shard.fetchClientValues('emojis.cache.size'),
        ]

        switch (args[0]) {
            default:
                Promise.all(promises).then((res) => {
                    return message.reply(
                        new Discord.MessageEmbed()
                        .setAuthor(`${message.client.user.username}: Статистика бота`, message.client.user.avatarURL())
                        .setColor('ffa500')
                        .addField(
                            'Основное',
                            `**Серверов:** ${format(res[0].reduce((a, b) => a + b, 0))}\n**Пользователей:** ${format(res[1].reduce((a, b) => a + b, 0))}\n**Каналов:** ${format(res[2].reduce((a, b) => a + b, 0))}\n**Эмодзи:** ${format(res[3].reduce((a, b) => a + b, 0))}`,
                            true
                        )
                        .addField(
                            'Зависимости',
                            `**Node.js:** ${process.version}\n**Discord.js**: v${Discord.version}\n**MongoDB:** v${require('../../../package.json').dependencies['mongodb'].replace('^', '')}`,
                            true
                        )
                        .addField(
                            'Остальное',
                            `**WebSocket:** ${message.client.ws.ping}ms\n**Discord API:** ${Date.now() - message.createdTimestamp}ms\n**Запущен:** ${fromNow(message.client.readyAt)}`,
                            true
                        )
                        .setFooter(message.guild.name, message.guild.iconURL())
                        .setTimestamp()
                    )
                });
        }
    }
}

module.exports = StatsCommand;