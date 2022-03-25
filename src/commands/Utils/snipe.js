const LeaftaEmbed = require("../../Structure/Client/Embed");

module.exports = {
    name: "snipe",
    description: "Renvoie le dernier message du channel supprimé",
    cooldown: "5s",
    usage: `snipe`,
    execute: async(client, message, args) => {
 
        if(!client.sniper.has(message.channel.id)) {
            message.channel.send({content: "Aucun message trouvé !"});
        } else {
            const msg = client.sniper.get(message.channel.id);
            const embed = new LeaftaEmbed()
            .setTitle('Sniped!')
            .addFields(
                { name: 'Auteur du message', value: `${msg.author.tag} \n Id:${msg.author.id}`},
                { name: 'Contenue du message', value: `${msg.content}`}
            )
            message.channel.send({embeds: [embed] });
        }
    }
}
//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978