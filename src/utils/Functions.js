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
            time = +new Date(time);
            break;
        case 'object':
            if (time.constructor === Date) time = time.getTime();
            break;
        default:
            time = +new Date();
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
    let seconds = (+new Date() - time) / 1000,
        token = 'назад',
        choice = 1;
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

/**
 * @note This part of code was taken from official open-source library "ms" and has been modified.
 * @see https://github.com/vercel/ms/
 */

const ms = (val) => {
    if (typeof val === 'string' && val.length > 0) {
        return parse(val);
    }

    function parse(str) {
        var s = 1000;
        var m = s * 60;
        var h = m * 60;
        var d = h * 24;
        var w = d * 7;
        var y = d * 365.25;

        str = String(str);
        if (str.length > 50) return null;

        const match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
        if (!match) return null;

        const n = parseFloat(match[1]);
        const type = (match[2] || 'ms').toLowerCase();

        switch (type) {
            case 'years':
            case 'year':
            case 'yrs':
            case 'yr':
            case 'y':
                return n * y;
            case 'weeks':
            case 'week':
            case 'w':
                return n * w;
            case 'days':
            case 'day':
            case 'd':
                return n * d;
            case 'hours':
            case 'hour':
            case 'hrs':
            case 'hr':
            case 'h':
                return n * h;
            case 'minutes':
            case 'minute':
            case 'mins':
            case 'min':
            case 'm':
                return n * m;
            case 'seconds':
            case 'second':
            case 'secs':
            case 'sec':
            case 's':
                return n * s;
            case 'milliseconds':
            case 'millisecond':
            case 'msecs':
            case 'msec':
            case 'ms':
                return n;
            default:
                return undefined;
        }
    }
}

module.exports = {
    getHelp,
    format,
    fromNow,
    ms
}