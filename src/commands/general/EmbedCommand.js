const FlameCommand = require('../../structures/FlameCommand');
const utils = require('../../utils/utils');

class EmbedCommand extends FlameCommand {
    constructor() {
        super('embed', {
            description: 'Отправить embed-сообщение от лица бота.',
            category: 'general',
            usage: 'embed <Структура>',
            cooldown: 0,
            userPermissions: ['ADMINISTRATOR'],
            aliases: []
        });
    }
    run (message, args) {
        if (!args.join(' ')) return utils.getHelp(message, this.name);

        try {
            message.delete();
            const embed = JSON.parse(args.join(' '));

            return embed.plainText ? message.channel.send(embed.plainText, { embed: embed }) : message.channel.send({ embed: embed });

        } catch {
            return message.reply('Вы указали неверный объект сообщния. Попробуйте сгенерировать его на сайте :no_entry:');
        }
    }
}

module.exports = EmbedCommand;