const LeaftaEmbed = require('../../Structure/Client/Embed');

module.exports = {
    name: "setmodlogs",
    description: "Permet de mettre en place les logs",
    permisions: ['ADMINISTRATOR'],
    usage: `setmodlogs || <id channel>`,


    execute: async(client, message, args) => {
      
        var older = message.guild.model.logsChannelId

        if(older === null) {
            var older = "Aucun"
        } else {
            var older = message.guild.channels.cache.get(older);
        }

        const logs =  message.mentions.channels.first() || message.guild.channels.cache.get(args[0]); 

        if(args.length === 0) {

            if(older === "Aucun") {
                const embed = new LeaftaEmbed()
                .setTitle('Les logs sont déjà désactivée')
                message.channel.send({ embeds: [embed]})
            } else {
                const embed = new LeaftaEmbed()
                .setTitle(`Les logs ont été désactiver avec succès`)
                .addFields({name: "Channel", value: `${older} -> Aucun`})
                message.channel.send({ embeds: [embed]})
                message.guild.model.logsChannelId = null;
                await message.guild.model.save();
            }

        } else if (!logs || logs.type != 'GUILD_TEXT') {
            const embed = new LeaftaEmbed()
            .setTitle('Veuillez fournir mentionner ou donner un id valide')
            message.channel.send({embeds: [embed]})
        } else {
            
            const embed = new LeaftaEmbed()
            .setTitle('Les logs ont été bien mis en place')
            .addFields({name: 'Channel', value: `${older} -> ${logs}`})
            message.channel.send({ embeds: [embed]})
            message.guild.model.logsChannelId = logs.id
            await message.guild.model.save();
            const embeds = new LeaftaEmbed()
            .setTitle('Les logs ont été bien mis en place')
            .addFields({name: 'Channel', value: `${older}> -> ${logs}`})
            .addFields({name: 'Modérateur', value: `<@${message.author.id}>`})
            message.guild.modlog({embeds: [embeds]})
            
            
        }
    }
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978