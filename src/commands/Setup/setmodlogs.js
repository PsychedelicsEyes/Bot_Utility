const LeaftaEmbed = require('../../Structure/Client/Embed');
const guildModel = require('../../models/guild.model');

module.exports = {
    name: "setmodlog",
    description: "Permet de mettre en place les logs",
    permisions: 'ADMINISTRATOR',
    usage: `\`setmodlogs || <id channel>\``,


    execute: async(client, message, args) => {

        var older = message.guild.model.logsChannelId

        if(older === null) {
            var older = "Aucun"
        } else {
            var older = message.guild.channels.cache.get(older).name;
        }

        if(args.length === 0) {
            const embed = new LeaftaEmbed()
            .addFields({ name:'Update ModLog', value:`\`${older}\` -> \`Aucun\``})
    
            message.guild.model.logsChannelId = null;
            await message.guild.model.save();
            return message.channel.send({ embeds: [embed]})
        }

        const logs =  message.mentions.channels.first() || message.guild.channels.cache.get(args[0]); 
       
        if(!logs || logs.type != 'GUILD_TEXT') {

            const embed = new LeaftaEmbed()
            .setTitle('Veuillez mentionner ou fournir un id de channel valide')
            return message.channel.send({ embeds: [embed]})

        } else if ( older === logs.name) {

            const embed = new LeaftaEmbed()
            .setTitle('Les logs sont déjà setup sur se channel')
            return message.channel.send({ embeds: [embed]})
           
        } else {
            const embed = new LeaftaEmbed()
            .setTitle('Modlog update')
            .setAuthor({
                name: message.author.username ?? "Nom introuvable",
                iconURL: message.author.displayAvatarURL({dynamic: true}) ?? ""
            })
            .addFields({ name: 'Logs channel', value: `\`${older}\` -> \`${logs.name}\``})
            message.guild.model.logsChannelId = logs.id;
            await message.guild.model.save();
            message.guild.modlog({ embeds: [embed] })
            return message.channel.send({ embeds: [embed]})
            

        }
    }
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978