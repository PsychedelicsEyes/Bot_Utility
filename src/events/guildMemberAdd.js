const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');
const guildModel = require('../models/guild.model');
const LeaftaEmbed = require('../Structure/Client/Embed');


module.exports.event =  async(member) => {
    const canvas = Canvas.createCanvas(1024, 500);
    const ctx = canvas.getContext('2d');

    var background = await Canvas.loadImage('./src/utils/wallpaper.jpg');
    ctx.drawImage(background, 0, 0, 1024, 500);

    ctx.font = "42px Impact";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.fillText(`Bienvenue ${member.user.tag}`, 512, 410);

    ctx.beginPath();
    ctx.arc(512, 166, 119, 0, Math.PI * 2);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.closePath();
    ctx.clip();

    var avatar = await Canvas.loadImage(member.user.displayAvatarURL({
        format: "png",
        size: 1024
    }))

    ctx.drawImage(avatar, 393, 46, 238, 238);

    const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
    

    const query = await guildModel.findById(member.guild.id).exec();

    const embed = new LeaftaEmbed()
    .setDescription(`${member} vient de rejoindre le serveur`)
    .setImage('attachment://welcome-image.png')
    member.guild.channels.cache.get(query.joinChannelId).send({embeds: [embed], files: [attachment]})
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978<<