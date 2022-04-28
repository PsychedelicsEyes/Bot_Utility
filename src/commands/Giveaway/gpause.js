const LeaftaEmbed = require('../../Structure/Client/Embed')

module.exports = {
    name: "gpause",
    description: "Permet de mettre en pause le giveaways",
    cooldown: "5s",
    permissions: 'ADMINISTRATOR',
    usage: `gpause <messageId>`,
    execute: async(client, message, args) => {

        const messageId = args[0];

        if(!messageId) {
            const embed = new LeaftaEmbed()
            .setTitle('Veuillez fournir un id')
            message.channel.send({ embeds: [embed] })
        } else {
            client.giveawaysManager.pause(messageId).then(() => {

                const embed = new LeaftaEmbed()
                .setTitle('Giveaways a été mis en pause avec succès!')
                message.channel.send({ embeds: [embed] })
            }).catch((err) => {
                const embed = new LeaftaEmbed()
                .setTitle(`Une erreur est survenue. \n ${err}`)
                message.channel.send({ embeds: [embed]})
            })
        }

    }
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978