const LeaftaEmbed = require('../../Structure/Client/Embed')
const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = {
    name: "unban",
    description: "Permet de d'unban un membre",
    cooldown: "5s",
    permissions: 'BAN_MEMBERS',
    usage: `unban <id member> <raison>`,
    execute: async(client, message, args) => {

        const id = args[0]
        let reason = args.slice(1).join('')

        if (!reason) {
            reason = "Aucune raison fournie"
        }

        if (!rgx.test(id)) {

            const embed = new LeaftaEmbed()
            .setTitle('Veuillez fournire une id valide')
            message.channel.send({ embeds: [embed] })
        }

        const bannedUsers = await message.guild.bans.fetch();
        const user = bannedUsers.get(id).user;
        
        if (!user) {

            const embed = new LeaftaEmbed()
            .setTitle('Je ne trouve pas l\'id,veuillez vérifiez l\'id fournis')
            message.channel.send({ embeds: [embed] })

        } else {

            await message.guild.members.unban(user, `Unban par ${message.author.tag}, raison: ${reason}`)

            const embed = new LeaftaEmbed()
            .setDescription(`${user} a été débannis avec succès`)
            message.channel.send({ embeds: [embed] })

            if (message.guild.modlog != null){
                const embeds = new LeaftaEmbed()
                .setTitle('Membre unban')
                .addFields({name: `Modérateur`, value: `${message.member}`})
                .addFields({name: `Membre unban`, value: `${user}`})
                .addFields({name: `Raison`, value: `${reason}`})
                message.guild.modlog({ embeds: [embeds] })
            }
            

        }


    }
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978