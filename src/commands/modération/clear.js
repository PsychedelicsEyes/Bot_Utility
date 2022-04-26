const LeaftaEmbed = require('../../Structure/Client/Embed')

module.exports = {
    name: "clear",
    description: "Permet de supprimer jusqu'à 99 messages",
    cooldown: "5s",
    usage: `clear <amount>`,
    execute: async(client, message, args) => {

        const count = args[0]

        if(!count) {
            const embed = new LeaftaEmbed()
            .setTitle('Il me faut un montant pour clear')
            return message.channel.send({embeds: [embed]})
        }
        if (count < 1 || count > 99){

            const embed = new LeaftaEmbed()
            .setTitle('Le montant doit être compris entre 1 et 100 ')
            return message.channel.send({ embeds: [embed]});
        }
    
        const { size } = await message.channel.bulkDelete(Number(count), true)

        const embed = new LeaftaEmbed()
        .setTitle('Clear effectué!')    
        .addFields(
            {name: 'Nombre de message supprimé', value: `${size-1}`}
        )
        if (message.guild.modlog != null){
        const embeds = new LeaftaEmbed()
        .setTitle('Un clear a été effectué')    
        .addFields(
            {name:'Auteur du clear', value:`<@${message.author.id}>`},
            {name: 'Nombre de message supprimé', value: `${size-1}`}
        )
        message.guild.modlog({embeds: [embeds]})
        }
        return message.channel.send({embeds: [embed]})
    }
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978