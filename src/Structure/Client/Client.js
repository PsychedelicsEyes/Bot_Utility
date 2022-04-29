const { Client, Intents, Collection } = require('discord.js')
const mongoose = require('mongoose');
const { GiveawaysManager } = require('discord-giveaways');
const giveawayModel = require('../../models/giveaway.model')
const fs = require('fs');
const ascii = require('ascii-table');

var tableC = new ascii('Commands');
tableC
    .setHeading('Command', 'Load Status');

var tableE = new ascii('Events');
tableE 
    .setHeading('Event', 'Load Status');

var tableI = new ascii('Interactions');
tableI
    .setHeading('Interactions', 'Load Status');

class LeaftaClient extends Client {
    constructor(options = {intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES
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

       

        fs.readdirSync("./src/commands/", {withFileTypes: true}).filter(dirent => dirent.isDirectory() && fs.readdirSync(`./src/commands/${dirent.name}`).length > 1).forEach(foldername => {
            if(!this.categories.includes(foldername.name)) {
                const categoryinfo = JSON.parse(fs.readFileSync(`./src/commands/${foldername.name}/category.json`));
                this.categories.push({...categoryinfo, label: foldername.name, value: foldername.name.toLowerCase(), default: false});
            }
        
            fs.readdirSync(`./src/commands/${foldername.name}`, {withFileTypes: true}).filter(dirent => dirent.isFile() && dirent.name.endsWith(".js")).map(file => file.name).forEach(filename => {
                const cmd = require(`../../commands/${foldername.name}/${filename}`);
                if(!cmd) return;
                if(cmd.cooldown) cmd.cooldowns = {};
                if(!cmd.name) {
                    tableC
                        .addRow(cmd.name, "Error name");
                } else {
                    if(cmd.cooldown) cmd.cooldowns = {};
                    cmd.category = foldername.name.toLowerCase();
                    this.commands.set(cmd.name, cmd)
                    tableC.addRow(cmd.name, "Ready");
                }
        
                if(cmd.aliases && Array.isArray(cmd.aliases)) {
                    cmd.aliases.forEach(alias => {
                        this.aliases.set(alias, cmd.name);
                    });
               }
            });
        })
        console.log(tableC.toString());

        fs.readdirSync("./src/events", {withFileTypes: true}).filter(dirent => dirent.isFile() && dirent.name.endsWith(".js")).forEach(event => {
            const eventFile = require(`../../events/${event.name}`);
            if(!eventFile.event) return;
            const eventType = event.name.substring(0, event.name.indexOf(".js"));
            this.on(eventType, eventFile.event);
            tableE.addRow(event.name, "Ready");
        });
        console.log(tableE.toString());

        fs.readdirSync("src/interactions", {withFileTypes: true}).filter(dirent => dirent.isFile() && dirent.name.endsWith(".js")).forEach(interactionfile => {
            const interactionReq = require(`../../interactions/${interactionfile.name}`);
            if(!interactionReq.name) return;
            tableI.addRow(interactionfile.name, "Ready");
            this.interactions.set(interactionReq.name, interactionReq);
        });
        console.log(tableI.toString());
        
        this.login(this.config.token);
    }
}

module.exports = LeaftaClient;

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978