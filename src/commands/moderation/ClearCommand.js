const FlameCommand = require('../../structures/FlameCommand');
const { getHelp } = require('../../utils/Functions');

class ClearCommamd extends FlameCommand {
    constructor() {
        super('clear', {
            description: 'Очищает определенное кол-во сообщений в канале.',
            category: 'moderation',
            usage: 'clear <Кол-во сообщений>',
            aliases: ['purge'],
            cooldown: 3,
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES']
        })
    }
    run(message, args) {
        if (!args[0]) return getHelp(message, this.name);
        if (isNaN(args[0]) || parseInt(args[0]) < 1 || parseInt(args[0]) >= 100 || !parseInt(args[0])) return message.reply('Укажите пожалуйста __верное__ число сообщений (от 1 до 99) :no_entry:');

        try {
            message.channel.bulkDelete(parseInt(args[0]) + 1);
        } catch {
            return message.channel.send('Я не могу удалять сообщения старше **14** дней :no_entry:');
        }

        message.channel.send(`✅ Было успешно удалено **${args[0]}** сообщений!`).then((m) => m.delete({ timeout: 4000 }));
    }
}

module.exports = ClearCommamd;