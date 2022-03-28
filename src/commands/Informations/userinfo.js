const LeaftaEmbed = require('../../Structure/Client/Embed')
const moment = require('moment')

module.exports = {
    name: "userinfo",
    description: "Envoie des informations sur un user",
    usage: `\`userinfo || <@mention>\``,
    execute: async(client, message, args) => {

       const member = message.mentions.users.first();

       if(!args[0])  {
            const createdDate = moment(message.author.createdTimestamp).format('DD/MM/YYYY')

           const embed = new LeaftaEmbed()
            .setTitle('UserInfo')
            .addFields(
                {name: 'Nom d\'utilisateur', value: `<@${message.author.id}>`},
                {name: 'Date de création du compte', value: `${createdDate}`},
                {name: 'Id', value: `${message.author.id}`}
            )
            .setImage(message.author.avatarURL({ dynamic: true }))
            message.channel.send({ embeds: [embed] })
        } else {
            const createdDate = moment(member.createdTimestamp).format('DD/MM/YYYY')
            const embed = new LeaftaEmbed()
            .setTitle('UserInfo')
            .addFields(
                {name: 'Nom d\'utilisateur', value: `<@${message.member.id}>`},
                {name: 'Date de création du compte', value: `${createdDate}`},
                {name: 'Id', value: `${message.member.id}`}
            )
            .setImage(message.author.avatarURL({ dynamic: true }))
            message.channel.send({ embeds: [embed] })
        }
    }
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978