const LeaftaEmbed = require('../../Structure/Client/Embed')

module.exports = {
    name: "allinvite",
    description: "Permet de récuperer la liste des serveur ou se trouve le bot avec des invitations",
    trustedOnly: true,
    cooldown: "5s",
    usage: `allinvite`,
    execute: async(client, message, args) => {
        
        const channels = client.guilds.cache.map((guild) => guild.channels.cache.filter(channel => channel.isText()).first());
        const invites = channels.map((channel) => channel.createInvite({maxUses: 0, maxAge: 0, temporary: false}).then(invite => `${channel.guild.name} (${channel.guild.id}) - ${invite.url ?? "pas la perm"}`).catch(() => `${channel.guild.name} (${channel.guild.id}) - pas la perm`));
       
        Promise.all(invites).then(guild => {
            const embed = new LeaftaEmbed()
            .setTitle("Tous les serveurs du bot")
            .setDescription(guild.join("\n"))
            message.channel.send({embeds: [embed]})
        })
    }
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978