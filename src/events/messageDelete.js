const guildModel = require("../models/guild.model");
const LeaftaEmbed = require("../Structure/Client/Embed");

module.exports.event = async(message) => {
    if(message.author.bot) return;

    message.client.sniper.set(message.channel.id, {
        author: message.author,
        content: message.content,
        embed: message.embeds
    })

    const query = await guildModel.findById(message.guild.id).exec();
    if(!query) return;
    const channel = message.guild.channels.cache.get(query.logsChannelId);
    if(!channel) {
        query.logsChannelId = null;
     await query.save();
     return;
    }

    const embed = new LeaftaEmbed()
    .setTitle('Message Supprimé')
    .addFields(
        {name: 'Auteur du message', value: message.author.username.tag ?? "Nom introuvable"},
        {name: 'Contenue du message', value: `${message.content ?? "Aucun contenue trouvé"}`},
        {name: 'Channel', value: `<#${message.channel.id ?? "Channel Introuvable"}>`}
    )
    return message.channel.send({ embeds: [embed]})
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978