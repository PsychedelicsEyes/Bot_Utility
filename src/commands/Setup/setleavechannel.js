const LeaftaEmbed = require('../../Structure/Client/Embed')

module.exports = {
    name: "setleavechannel",
    description: "Permet de mettre en place le système d'arriver",
    permisions: 'ADMINISTRATOR',
    cooldown: "5s",
    usage: `setleavechannel || <id channel>`,
    execute: async(client, message, args) => {

        var older = message.guild.model.leaveChannelId

        if(older === null) {
            var older = "Aucun"
        } else {
            var older = message.guild.channels.cache.get(older);
        }

        const leave =  message.mentions.channels.first() || message.guild.channels.cache.get(args[0]); 

        
        if(args.length === 0) {

            if(older === "Aucun") {
                const embed = new LeaftaEmbed()
                .setTitle('Les message de départ sont déjà désactivée')
                message.channel.send({ embeds: [embed]})
            } else {
                const embed = new LeaftaEmbed()
                .setTitle(`Les message de départ ont été bien mis en place`)
                .addFields({name: "Channel", value: `${older} -> Aucun`})
                message.channel.send({ embeds: [embed]})
                message.guild.model.joinChannelId = null;
                await message.guild.model.save();
                if (message.guild.modlog != null){
                    const embeds = new LeaftaEmbed()
                    .setTitle('Les message de départ ont été supprimé')
                    .addFields({name: 'Channel', value: `${older}> -> ${leave}`})
                    .addFields({name: 'Modérateur', value: `<@${message.author.id}>`})
                    message.guild.modlog({embeds: [embeds]})
                }
            }

        } else if (!leave || leave.type != 'GUILD_TEXT') {
            const embed = new LeaftaEmbed()
            .setTitle('Veuillez fournir mentionner ou donner un id valide')
            message.channel.send({embeds: [embed]})
        } else {
            
            const embed = new LeaftaEmbed()
            .setTitle('Les message de départ ont été bien mis en place')
            .addFields({name: 'Channel', value: `${older} -> ${leave}`})
            message.channel.send({ embeds: [embed]})
            message.guild.model.leaveChannelId = leave.id
            await message.guild.model.save();
            if (message.guild.modlog != null){
                const embeds = new LeaftaEmbed()
                .setTitle('Les message de départ ont été bien mis en place')
                .addFields({name: 'Channel', value: `${older}> -> ${leave}`})
                .addFields({name: 'Modérateur', value: `<@${message.author.id}>`})
                message.guild.modlog({embeds: [embeds]})
            }
           
            
        }
    }
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978