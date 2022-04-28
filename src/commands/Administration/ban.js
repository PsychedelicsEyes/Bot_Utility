const LeaftaEmbed = require('../../Structure/Client/Embed')

module.exports = {
    name: "ban",
    description: "Permet de ban un membre",
    cooldown: "5s",
    usage: `ban <membre> <jours de message a supprimer> <raison> || <id> <jours de message a supprimer> <raison>`,
    execute: async(client, message, args) => {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const deleteMessage = args[1]
        let reason = args.slice(2).join('')

        if(!reason) {
            reason = "Aucune raison fournie"
        }

        if(!member) {

            const embed = new LeaftaEmbed()
            .setTitle('Veuillez mentionner un membre ou donner une id valide')
            message.channel.send({ embeds: [embed] })

        } else if (member.bannble == false) {

            const embed = new LeaftaEmbed()
            .setTitle('Je ne peut pas ban ce membre')
            .addFields({ name: 'Raison:', value: 'Plus haut placé que moi \n Owner du serveur'})
            message.channel.send({ embeds: [embed] })

        } else if (member == message.author) {       

            const embed = new LeaftaEmbed()
            .setTitle('Vous pouvez pas vous ban vous même')
            message.channel.send({ embeds: [embed] })

        } else if (member.roles.highest.position >= message.member.roles.highest.position) {
            
            const embed = new LeaftaEmbed()
            .setTitle('Vous pouvez pas ban un membre plus haut placé que vous')
            message.channel.send({ embeds: [embed] })

        } else if (!deleteMessage) {
            
            const embed = new LeaftaEmbed()
            .setTitle('Veuillez définir un nombre de jours de message à supprimer')
            .setDescription('Si vous voulez supprimer aucun message mettez 0 sinon le chiffre doit être compris entre 0 et 7 (sa supprime en jours)')
            message.channel.send({ embeds: [embed] })

        } else if (deleteMessage > 7 || deleteMessage < 0) {

            const embed = new LeaftaEmbed()
            .setTitle('Veuillez choisir entre 0 a 7jours')
            message.channel.send({ embeds: [embed] })

        } else {
            message.guild.bans.create(member, {
                reason: `Bannis par ${message.author.tag}, raison: ${reason}`,
                days: deleteMessage
            })

            const embed = new LeaftaEmbed()
            .setDescription(`${member} a été ban avec succès`)
            message.channel.send({ embeds: [embed] })
            
            if (message.guild.modlog != null){
                const embeds = new LeaftaEmbed()
                .setTitle('Membre ban')
                .addFields({name: `Modérateur`, value: `${message.member}`})
                .addFields({name: `Membre bannis`, value: `${member}`})
                .addFields({name: `Raison`, value: `${reason}`})
                message.guild.modlog({ embeds: [embeds] })
            }
        }
    }
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978