const FlameCommand = require('../../structures/FlameCommand');
const { MessageEmbed } = require('discord.js');
const { getHelp } = require('../../utils/Functions');
const fetch = require('node-fetch');

class WhoisCommand extends FlameCommand {
    constructor() {
        super('whois', {
            description: 'Возвращает информацию о домене/IP-адресе.',
            category: 'general',
            usage: 'whois <Домен/IP-адрес>',
            aliases: ['ip', 'ipinfo'] 
        });
    }
    run(message, args) {

        if (!args[0]) return getHelp(message, this.name);
        try {
            fetch(`http://ip-api.com/json/${encodeURIComponent(args[0])}`).then((r) => r.json())
                .then((res) => {
                    if (res.status !== 'success') return message.reply('Укажите пожалуйста домен/**верный** IP-адрес :no_entry:');

                    return message.reply(
                        new MessageEmbed()
                          .setAuthor(`Информация о ${res.query}`, `https://www.countryflags.io/${res.countryCode}/flat/64.png`)
                          .setColor('ffa500')
                          .setDescription(`${res.country}, ${res.city}, ${res.region}\nОрганизация: ${res.org}`)
                          .setFooter(res.as)
                          .setTimestamp()    
                    );
                });

        } catch {}
    }
}

module.exports = WhoisCommand;