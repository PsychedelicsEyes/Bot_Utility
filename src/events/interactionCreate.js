const guildModel = require('../models/guild.model');
const { Permissions, MessageActionRow, MessageButton, SnowflakeUtil, MessageSelectMenu } = require('discord.js');
const LeaftaEmbed = require('../Structure/Client/Embed');

module.exports.event = async(interaction) => {
    const filtercc = (message) => message.author.id == interaction.user.id;
    var query = await guildModel.findById(interaction.guild.id).exec();
    if(!query) {
        const payload = {
            _id: interaction.guild.id
        }
        query = await guildModel.create(payload);
    }

    interaction.guild.model = query;

    if(!interaction.client.interactions.has(interaction.customId)) return;
    const action = interaction.client.interactions.get(interaction.customId);
    if(!action) return;

    action.execute(interaction);
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978