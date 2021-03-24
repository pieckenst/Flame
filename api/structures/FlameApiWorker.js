const fastify = require('fastify')();
const config = require('../../config.json');

class FlameApiWorker {
    constructor(manager) {
        this.manager = manager;
        this.app = fastify;
        this.config = config;
    }
    start() {
        this.app.register(require('fastify-rate-limit'), { 
            max: 100,
            timeWindow: 3 * 60 * 1000,
            cache: 5000,
            addHeaders: {
                'x-ratelimit-limit': true,
                'x-ratelimit-reset': true,
                'x-ratelimit-remaining': true,
                'retry-after': true
            }
        });
        this.app.setErrorHandler(function (error, request, response) {
            if (response.statusCode == 429) error.message = 'You are being ratelimited, try again in a couple of minutes.';
            response.send(error);
        });
        
        global.ApiWorker = this;

        require('../routes').forEach((route) => this.app.route(route));
        this.app.listen(this.config.port || 3000);

        return console.log(`[API] HTTP-server was successfully started on port ${this.config.port || 3000}.`);
    }
}

module.exports = FlameApiWorker;