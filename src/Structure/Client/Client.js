const { Client, Intents, Collection } = require('discord.js')
const mongoose = require('mongoose');

class LeaftaClient extends Client {
    constructor(options = {intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ]})
    {
        super(options);
        this.commands = new Collection();
        this.interactions = new Collection();
        this.aliases = new Collection();
        this.categories = new Array();
        this.sniper = new Collection();
        this.config = require('../Config/client')

        mongoose.connect(this.config.mongoURL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        mongoose.connection.on('connected', () => 
        console.log("La connection a la db a été établie")
        );
        this.login(this.config.token);
    }
}

module.exports = LeaftaClient;

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978