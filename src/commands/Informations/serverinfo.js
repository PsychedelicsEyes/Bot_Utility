const LeaftaEmbed = require('../../Structure/Client/Embed');
const moment = require('moment');

module.exports = {
    name: "serverinfo",
    description: "Envoie des informations du serveur",
    cooldown: "20s",
    usage: `serverinfo`,
    execute: async(client, message, args) => {

        const createdDate = moment(message.guild.createdAt).format('DD/MM/YYYY')
        var verificationLevel = message.guild.verificationLevel
        if(verificationLevel === "NONE") {
            var verificationLevel = "Aucune"
        };
        
        var premiumTier = message.guild.premiumTier
        if(premiumTier === "NONE") {
            var premiumTier = "0"
        };

        var urlInvite = message.guild.vanityURLCode
        if(urlInvite === null) {
            var urlInvite = "Aucune url"
        }


        const embed = new LeaftaEmbed()
        .setTitle('ServerInfo')
        .addFields(
            {name: 'Nom du serveur', value:`${message.guild.name}`},
            {name: 'Id du serveur', value:`${message.guild.id}`},
            {name: 'Owner du serveur', value:`<@${message.guild.ownerId}>`},
            {name: 'Niveaux de vérification', value:`${verificationLevel}`},
            {name: 'Date de création du serveur', value:`${createdDate}`},
            {name: 'Niveaux de boost', value:`${premiumTier}`},
            {name: 'Url d\'invitation', value:`${urlInvite}`},
            {name: 'Nombre de membre', value:`${message.guild.memberCount}`},
            {name: 'Nombre de channel', value:`${message.guild.channels.channelCountWithoutThreads}`}
            
        )
        .setImage(message.guild.iconURL({ dynamic: true }))
        message.channel.send({ embeds: [embed] })

    }
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978