const LeaftaEmbed = require('../../Structure/Client/Embed')
const fetch = require('node-fetch');

module.exports = {
    name: "trumptweet",
    description: "Permet d'insèrer un text dans une image de tweet du compte de trump",
    cooldown: "2s",
    usage: `trumptweet <text>`,
    execute: async(client, message, args) => {
        
        const tweet = args.slice(0).join('')

        if(!tweet) {

            const embed = new LeaftaEmbed()
            .setTitle('Veuillez fournir un message a tweeter')
            message.channel.send({ embeds: [embed] })

        } else if ( tweet > 68) {
            
            const embed = new LeaftaEmbed()
            .setTitle('Veuillez fournir un messsag de moins 68 caractères')
            message.channel.sen({ embeds: [embed] })

        } else {
            try {

                const res = await fetch(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${tweet}`);
                const img = (await res.json()).message;

                const embed = new LeaftaEmbed()
                .setTitle(':flag_us:  Trump Tweet  :flag_us: ')
                .setImage(img)
                message.channel.send({embeds : [embed]})

            } catch (err) {
               
                const embed = new LeaftaEmbed()
                .setTitle('Une erreur est survenue')
                .addFields(
                    {name: 'Erreur', value: `${err}`}
                )
                message.channel.send({ embeds: [embed] })

            }
        }

    }
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978