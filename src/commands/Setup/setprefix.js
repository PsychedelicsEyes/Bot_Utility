const LeaftaEmbed = require('../../Structure/Client/Embed');
const guildModel = require('../../models/guild.model');

module.exports = {
    name: "setprefix",
    description: "Permet de changer le prefix du bot",
    cooldown: "20s",
    usage: `setprefix <prefix>`,
    permissions: ['MANAGE_CHANNELS'],
    args: {
        minimum: 1,
        text: "Il faut un argument"
    },
    execute: async(client, message, args) => {

        const older = message.guild.model.prefix

        if(!message.guild.model) {
            const payload = {
                _id: message.guild.id,
                prefix: args[0]
            }
            await guildModel.create(payload);
        } else {
            message.guild.model.prefix = args[0];
            await message.guild.model.save();

            const embed = new LeaftaEmbed()
            .setTitle("Prefix update")
            .setAuthor({
                name: message.author.username ?? "Nom introuvable",
                iconURL: message.author.displayAvatarURL({dynamic: true}) ?? ""
            })
            .setDescription(`\`${older}\` -> \`${args[0]}\``)
            .addFields(
                { name: 'Modifié par:', value: `<@${message.author.id}>`}
            );
            message.channel.send({ embeds: [embed] }) 
            if (message.guild.modlog != null){ 
            message.guild.modlog({ embeds: [embed] })
            }
        }

    
         
    
    }
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978