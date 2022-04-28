const LeaftaEmbed = require('../../Structure/Client/Embed')
const ms = require('ms');
const messages = require('../../utils/messageGiveaways')

module.exports = {
    name: "gstart",
    description: "Permet de commencer un giveaway",
    permissions: "ADMINISTRATOR",
    cooldown: "5s",
    usage: `gstart <channel> <temps> <nombre de gagnant> <prix>`,
    execute: async(client, message, args) => {

        let giveawayChannel = message.mentions.channels.first();
        let giveawayDuration = args[1];
        let giveawayNumberWinners = args[2];
        let giveawayPrize = args.slice(3).join(' ');

        if (!giveawayChannel) {
            const embed = new LeaftaEmbed()
            .setTitle('Veuillez mentionner un channel')
            message.channel.send({ embeds: [embed] })
        } else if (!giveawayDuration) {
            const embed = new LeaftaEmbed()
            .setTitle('Veuillez donner un temps de giveaway')
            .addFields({
                name:'Veuillez préciser le date correctement',
                value:'w = semaine \n d = jours \n m = minute \n s = seconde'
            })
            message.channel.send({ embeds: [embed] })
        } else if (!giveawayNumberWinners) {
            const embed = new LeaftaEmbed()
            .setTitle('Veuillez indiquer le nombre de gagnant')
            message.channel.send({ embeds: [embed] })
        } else if (!giveawayPrize) {
            const embed = new LeaftaEmbed()
            .setTitle('Veuillez indiquer un prix')
            message.channel.send({ embeds: [embed] })
        } else {

            client.giveawaysManager.start(giveawayChannel, {
                duration: ms(giveawayDuration),

                prize: giveawayPrize,
             
                winnerCount: parseInt(giveawayNumberWinners),

                hostedBy: message.author, 

                messages,
            });
            
            const embed = new LeaftaEmbed()
            .setDescription(`Giveaway commencer dans le channel ${giveawayChannel}`)
            message.channel.send({ embeds: [embed] })

        }



    }
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978