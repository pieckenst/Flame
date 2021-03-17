const { Collection, MessageEmbed } = require('discord.js');
const cooldown = new Collection();

class CommandsExecutorService {
    constructor(message, client) {
        this.message = message;
        this.client = client || message.client;
    }
    async runCommand() {
        if (this.message.author.bot) return;
        if (this.message.channel.type === 'dm' || !this.message.guild) return;

        const data = await this.client.database.collection('guilds').findOne({ guildID: this.message.guild?.id });
        if (!this.message.content.startsWith(data.prefix)) return;

        const [cmd, ...args] = this.message.content.slice(this.prefix.length).trim().split(/ +/g);
        const command = this.client.commands.get(cmd);

        if (cooldown.has(this.message.author.id) && cooldown.get(this.message.author.id) == command?.name) return this.message.react('⏱️').catch();
        if (command) {
            try {
                command.run(this.message, args);
            } catch {
                this.message.channel.send(
                    new MessageEmbed()
                        .setTitle('Упс, что-то пошло не так…')
                        .setDescription('При выполнении данной команды возникла неизвестная ошибка. Попробуйте пожалуйста позже, или обратитесь на сервер поддержки.')
                        .setColor('#ff3333')
                        .setFooter(this.message.guild.name, this.message.guild.iconURL())
                        .setTimestamp()
                )
            }
            cooldown.set(this.message.author.id, command.name);

            setTimeout(() => cooldown.delete(this.message.author.id), command.cooldown * 1000);
        }
    }
}

module.exports = CommandsExecutorService;