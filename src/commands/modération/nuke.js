const LeaftaEmbed = require('../../Structure/Client/Embed')
const guildModel = require("../../models/guild.model");

module.exports = {
    name: "nuke",
    description: "Permet de recréez un channel",
    cooldown: "5s",
    permissons: "Manage_CHANNELS",
    usage: "\`nuke\`",
    execute: async(client, message, args) => {
        

        message.channel.clone().then((ch) => {
            ch.setParent(message.channel.parentId);
            ch.setPosition(message.channel.position);

            
            const logs = new LeaftaEmbed()
            .setTitle('Channel nuke!')
            .setAuthor({
                name: message.author.username ?? "Nom introuvable",
                iconURL: message.author.displayAvatarURL({dynamic: true}) ?? ""
            })
            .addFields(
                {name: 'Auteur du nuke', value: `<@${message.author.id ?? "Nom introuvable"}>`},
                {name: 'Channel', value: `<#${message.channel.id ?? "Channel Introuvable"}>`}
            )
            message.guild.modlog({ embeds: [logs]})
            message.channel.delete();

            const embed = new LeaftaEmbed()
            .setAuthor({
                name: message.author.username ?? "Nom introuvable",
                iconURL: message.author.displayAvatarURL({dynamic: true}) ?? ""
            })
            .setTitle('Channel Nuke!')
            .addFields({ name:'Auteur du nuke', value:`<@${message.author.id}>`});
            ch.send({ embeds:[embed]})
           
        });

    }
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978