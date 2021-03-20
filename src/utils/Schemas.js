const GuildSchema = {
    prefix: 'f.',
    ideaChannel: null,
    ideaCount: 0,
    ideas: [],
    welcome: {
        enabled: false,
        text: null,
        channel: null
    },
    leave: {
        enabled: false,
        text: null,
        channel: null
    },
    welcomeRole: null,
    currency: '$',
    work: { min: 100, max: 400 },
    items: [],
    cooldown: {
        work: 3600 * 3,
        crime: 3600 * 5,
        rob: 3600 * 24,
        fish: 3600 * 3,
        mine: 3600 * 5
    },
    moderator: null,
    muteRole: null,
    disabledCommands: [],
    modules: {
        moderation: true,
        economy: true,
        music: true
    },
    antiInvite: {
        enabled: false,
        message: null,
        whiteList: []
    }
};

module.exports = {
    GuildSchema
};