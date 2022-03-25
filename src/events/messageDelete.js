module.exports.event = async(message) => {
    if(message.author.bot) return;

    message.client.sniper.set(message.channel.id, {
        author: message.author,
        content: message.content,
        embed: message.embeds
    })
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978