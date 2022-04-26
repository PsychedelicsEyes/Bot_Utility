const LeaftaEmbed = require("../Structure/Client/Embed");

module.exports.event = async(message) => {
    if(message.author.bot) return;


    const embed = new LeaftaEmbed()
    .setTitle('Message Supprimé')
    .setAuthor({
        name: message.author.username ?? "Nom introuvable",
        iconURL: message.author.displayAvatarURL({dynamic: true}) ?? ""
    })
    .addFields(
        {name: 'Auteur du message', value: `<@${message.author.id ?? "Nom introuvable"}>`},
        {name: 'Contenue du message', value: `${message.content ?? "Aucun contenue trouvé"}`},
        {name: 'Channel', value: `<#${message.channel.id ?? "Channel Introuvable"}>`}
    )
    message.guild.modlog({embeds: [embed]})

    message.client.sniper.set(message.channel.id, {
        author: message.author,
        content: message.content,
        embed: message.embeds
    })
    

}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978