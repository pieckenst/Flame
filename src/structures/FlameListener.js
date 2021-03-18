class FlameListener {
    constructor(name, options = {}) {
        this.name = name;
        this.emitter = options.event || null;
    }
}

module.exports = FlameListener;