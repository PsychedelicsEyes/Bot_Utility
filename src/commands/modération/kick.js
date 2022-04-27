const { cp } = require('fs');
const LeaftaEmbed = require('../../Structure/Client/Embed')

module.exports = {
    name: "kick",
    description: "Permet de kick un membre",
    permissions: 'KICK_MEMBERS',
    cooldown: "5s",
    usage: `kick <member> (raison) || <id>`,
    execute: async(client, message, args) => {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.slice(1).join(' ');
        if(!reason) {
            reason = "Aucune raison fournie"
        }

        if(!member) {

            const embed = new LeaftaEmbed()
            .setTitle('Veuillez mentionner un membre ou donner un id valide')
            message.channel.send({ embeds: [embed] })

        } else if (member.kickable == false) {

            const embed = new LeaftaEmbed()
            .setTitle('Je ne peux pas kick le membre')
            .addFields({ name:'Raisons possibles:', value: `Plus haut placé que moi \n Owner du serveur`})
            message.channel.send({ embeds: [embed] })

        } else if (member == message.author) {
            
            const embed = new LeaftaEmbed()
            .setTitle('Vous pouvez pas vous kick vous même')
            message.channel.send({ embeds: [embed] })

            
        } else if (member.roles.highest.position >= message.member.roles.highest.position) {

            const embed = new LeaftaEmbed()
            .setTitle('Vous pouvez pas expulser un membre plus haut placé que vous')
            message.channel.send({ embeds: [embed] })

        } else {
            
            const embed = new LeaftaEmbed()
            .setTitle(`${member} a été expulser avec succès`)
            message.channel.send({ embeds: [embed] })

            if (message.guild.modlog != null){
                const embeds = new LeaftaEmbed()
                .setTitle('Membre kick')
                .addFields({name: `Modérateur`, value: `${message.member}`})
                .addFields({name: `Raison`, value: `${reason}`})
                message.guild.modlog({ embeds: [embeds] })
            }

            await member.kick(`Kick par ${message.author.tag}, raison: ${reason}`)
        }
    }
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978