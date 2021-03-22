const FlameCommand = require('../../structures/FlameCommand');
const { MessageEmbed } = require('discord.js');

class HelpCommand extends FlameCommand {
    constructor() {
        super('help', {
            description: 'Список команд и меню помощи.',
            category: 'general',
            usage: 'help [Команда]',
            cooldown: 3,
            aliases: []
        });
    }
    async run(message, args) {
        const categories = { general: 'Основное', moderation: 'Модерация' };
        const data = await message.client.database.collection('guilds').findOne({ guildID: message.guild.id });


        if (!args[0]) {
            const embed = new MessageEmbed()
                .setTitle('Список команд')
                .setDescription(`Получить более подробную информацию о той или иной команде — \`${data.prefix}help [Команда]\``)
                .setColor('ffa500')
                .setThumbnail(message.client.user.avatarURL())
                .setFooter(message.guild.name, message.guild.iconURL())
                .setTimestamp()

            Object.keys(categories).forEach((i) => {
                embed.addField(categories[i], [...new Set(message.client.commands.filter((cmd) => cmd.category == i).map((x) => `\`${data.prefix}${x.name}\``))].join(', '));
            });
            return message.reply(embed);
            
        } else {
            const command = message.client.commands.get(args[0]);
            if (!command || command.category === 'developers') return message.reply('Указанная вами команда не была найдена в списке доступных :no_entry:');

            return message.reply(
                new MessageEmbed()
                    .setTitle('Информация о команде')
                    .setColor('ffa500')
                    .setDescription(`\`\`\`${command.usage}\`\`\``)
                    .addField(':scroll: Описание', command.description, false)
                    .addField(':file_folder: Категория', categories[command.category], true)
                    .addField(':paperclips: Псевдонимы', command.aliases.length > 0 ? command.aliases.map((alias) => `\`${alias}\``).join(', ') : 'Отсутствуют', true)
                    .setThumbnail(message.client.user.avatarURL())
                    .setFooter(message.guild.name, message.guild.iconURL())
                    .setTimestamp()
            )
        }
    }
}

module.exports = HelpCommand;