const getHelp = (message, command) => {
    return message.client.commands.get('help').run(message, [command]);
}

module.exports = {
    getHelp
}