const getHelp = (message, command) => {
    return message.client.commands.get('help').run(message, [command]);
}
const format = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
};
const fromNow = (time) => {
    switch (typeof time) {
        case 'number':
            break;
        case 'string':
            time = + new Date(time);
            break;
        case 'object':
            if (time.constructor === Date) time = time.getTime();
            break;
        default:
            time = + new Date();
    }
    const formats = [
        [50, 'секунд', 1],
        [120, '1 минуту назад', 'спустя 1 минуту'],
        [3600, 'минут', 60],
        [7200, '1 час назад', 'спустя 1 час'],
        [86400, 'часов', 3600],
        [604800, 'дней', 86400],
        [2419200, 'недель', 604800],
        [29030400, 'месяцев', 2419200],
        [2903040000, 'лет', 29030400]
    ]
    let seconds = (+ new Date() - time ) / 1000, token = 'назад', choice = 1;
    if (seconds == 0) return 'Только что';
    if (seconds < 0) {
        seconds = Math.abs(seconds);
        token = 'спустя',
        choice = 2;
    }
    let i = 0;
    let format;

    while (format = formats[i++]) {
        if (seconds < format[0]) {
            if (typeof format[2] == 'string') return format[choice];
            else return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
        }
    }
    return time;
};

module.exports = {
    getHelp,
    format,
    fromNow
}