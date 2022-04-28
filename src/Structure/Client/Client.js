const { Client, Intents, Collection } = require('discord.js')
const mongoose = require('mongoose');
const { GiveawaysManager } = require('discord-giveaways');
const giveawayModel = require('../../models/giveaway.model')

class LeaftaClient extends Client {
    constructor(options = {intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
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

        const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {

            async getAllGiveaways() {
    
                return await giveawayModel.find().lean().exec();
            }
 
            async saveGiveaway(messageId, giveawayData) {

                await giveawayModel.create(giveawayData);

                return true;
            }
        

            async editGiveaway(messageId, giveawayData) {

                await giveawayModel.updateOne({ messageId }, giveawayData, { omitUndefined: true }).exec();

                return true;
            }
        

            async deleteGiveaway(messageId) {

                await giveawayModel.deleteOne({ messageId }).exec();

                return true;
            }
        };


        const manager = new GiveawayManagerWithOwnDatabase(this, {
            default: {
                botsCanWin: false,
                embedColor: '#FF0000',
                embedColorEnd: '#000000',
                reaction: '🎉'
            }
        });

        this.giveawaysManager = manager;
        
        this.login(this.config.token);
    }
}

module.exports = LeaftaClient;

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978