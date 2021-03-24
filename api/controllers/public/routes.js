const collectStatistics = require('./functions/collectStatistics');

module.exports = [
    {
        method: 'GET',
        url: '/public/stats',
        handler: collectStatistics
    },
]