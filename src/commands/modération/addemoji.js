const LeaftaEmbed = require('../../Structure/Client/Embed')
const { Util } = require("discord.js")

module.exports = {
    name: "addemoji",
    description: "Permet d'ajouter des émojis au serveur",
    cooldown: "5s",
    permissons: ["MANAGE_EMOJIS"],
    usage: `addemoji :emoji:`,
    execute: async(client, message, args) => {

        const emoji = args[0]

        if(!emoji) {

            const embed = new LeaftaEmbed()
            .setTitle("Veuillez mentionner un émoji")
            return message.channel.send({ embeds: [embed] })
        }

        let customemoji = Util.parseEmoji(emoji)

        if(customemoji.id) {
            const link =  `https://cdn.discordapp.com/emojis/${customemoji.id}.${
                customemoji.animated ? "gif" : "png"
            }`
            const emoji = await message.guild.emojis.create(
                `${link}`,
                `${`${customemoji.name}`}`
            );
            const embed = new LeaftaEmbed()
            .setTitle('Emoji ajouté!')
            .addFields(
                {name:"Nom de l'emoji", value:`${customemoji.name}`},
                {name:"Emoji", value:`${emoji}`}
            )
            if (message.guild.modlog != null){
            const embeds= new LeaftaEmbed()
            .setTitle('Emoji ajouté au serveur!')
            .addFields(
                {name: 'Auteur de l\'ajout', value: `<@${message.author.id}>`},
                {name: 'Nom de l\'emoji', value:`${customemoji.name}`},
                {name: 'Emoji', value: `${emoji}`}
            )
            message.guild.modlog({ embeds: [embeds]})
            }
            return message.channel.send({ embeds: [embed]})
            
        }


     
    }
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978