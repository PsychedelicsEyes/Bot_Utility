const LeaftaEmbed = require('../../Structure/Client/Embed');
const guildModel = require('../../models/guild.model');

module.exports = {
    name: "setprefix",
    description: "Permet de changer le prefix du bot",
    cooldown: "20s",
    usage: `setprefix <prefix>`,
    args: {
        minimum: 1,
        text: "Il faut un argument"
    },
    execute: async(client, message, args) => {

        if(!message.guild.model) {
            const payload = {
                _id: message.guild.id,
                prefix: args[0]
            }

            await guildModel.create(payload);
        } else {

            message.guild.model.prefix = args[0];
            await message.guild.model.save();
        }

        const embed = new LeaftaEmbed()
        .setTitle(`Nouveaux prefix: \`${args[0]}\``)
        .addFields(
            { name: 'Modifié par:', value: `\`${message.author.tag}\` \n (id: \`${message.author.id}\`)`}
        );
        message.channel.send({ embeds: [embed] })   
      
    }
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978