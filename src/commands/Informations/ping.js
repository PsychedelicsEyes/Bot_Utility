const LeaftaEmbed = require('../../Structure/Client/Embed')

module.exports = {
    name: "ping",
    description: "Envoie la latence du bot",
    cooldown: "20s",
    usage: `ping`,
    execute: async(client, message, args) => {
        const embed = new LeaftaEmbed()
        embed.setTitle('Calcul du ping en cours..', '');

        const msg = await message.channel.send({embeds:[embed]});
        const ping = msg.createdTimestamp - message.createdTimestamp;

        const embededit = new LeaftaEmbed()
        .setTitle('🏓 Pong!')
        .addFields(
            { name: 'Latence du bot', value: `${ping}ms`},
            { name: 'Ping entre le client et le websocket', value: `${client.ws.ping}ms`}
        )
        msg.edit({embeds:[embededit]}).catch();
    }
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978