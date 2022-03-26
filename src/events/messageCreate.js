const ms = require('ms')
const guildModel = require('../models/guild.model');
const LeaftaEmbed = require('../Structure/Client/Embed');
const config = require('../Structure/Config/client');

module.exports.event = async(message) => {
    const client = message.client;
   message.content = message.content ?? "";
   if(message.channel.type.toLowerCase() == "dm") return;
   if(message.author.bot) return;
  
   const query = await guildModel.findById(message.guild.id).exec();
   if(query) message.guild.model = query;
   let prefix = query != null ? query.prefix : config.prefix; 

    message.guild.modlog = async(options) => {
    if(!message.guild.model) return;
    if(!message.guild.model.logsChannelId || message.guild.model.logsChannelId == null) return;
    const channel = message.guild.channels.cache.get(message.guild.model.logsChannelId);
    if(!channel) {
     message.guild.model.logsChannelId = null;
     await message.guild.model.save();
     return;
    } 
    channel.send(options);
    }
    
    if(!message.content.startsWith(prefix) && !message.mentions.has(client.user.id)) {
        return;
    }  else if(message.mentions.has(client.user.id) && message.content.includes(client.user.id)) {
    const embed = new LeaftaEmbed()
    .setTitle('Besoins d\'aide?')
    .setDescription(`Mon prefix: \`${prefix}\``)
    .addField('Développeur', '\`Psychedelics Eyes#0667\`')
    .setTimestamp();
    return message.channel.send({embeds:[embed]});
}

   const args = message.content.slice(prefix.length).trim().split(/ +/g);
   const command = args.shift().toLowerCase();

   if(!command) return;
   var cmd = client.commands.get(command);
   if(!cmd) cmd = client.commands.get(client.aliases.get(command));
   if(!cmd) return;

   if(cmd.args) {
        if(!cmd.args.minimum && !Number.isInteger(cmd.args.minimum)) return;
        if(cmd.args.default) {
            args = cmd.args.default.split(" ");
        } else {
            if(!cmd.args.text) cmd.args.text = "Vous n'avez pas assez donné de paramètres..";
            if(args.length < cmd.args.minimum) {
                return message.channel.send({content: cmd.args.text}).catch();
            }
        }
    }


    if(typeof(cmd.permissions) != "undefined") {
        if(Array.isArray(cmd.permissions)) {
            var permbotmanquantes = cmd.permissions.filter(perm => !message.guild.me.permissions.has(perm));
            if(permbotmanquantes.length != 0) return message.channel.send(`Il me manque les permissions ${permbotmanquantes.map(perm => `\`${perm}\``).join(",")}`)
            var permusermanquantes = cmd.permissions.filter(perm => !message.member.permissions.has(perm));
            if(permusermanquantes.length != 0) return message.channel.send(`Il te manque les permissions ${permbotmanquantes.map(perm => `\`${perm}\``).join(",")}`)
        } else if(typeof(cmd.permissions) == "string") {
            if(!message.guild.me.permissions.has(cmd.permissions)) {
                return message.channel.send(`Il me manque la permission \`${cmd.permissions}\``);
            } else if(!message.member.permissions.has(cmd.permissions)) {
                if(message.guild.ownerId != message.author.id) {
                    return message.channel.send(`Il te manque la permission \`${cmd.permissions}\``);
                }
                   
            }
        }
    } 
    
    if(cmd.cooldown && cmd.cooldowns.hasOwnProperty(message.author.id) && cmd.cooldowns[message.author.id] > Date.now()) {
        const timeSpan = cmd.cooldowns[message.author.id] - Date.now();
        return message.channel.send({content: `Vous pourrez réutiliser la commande dans ${formatDate(timeSpan)}`}).then(msg => setTimeout(() => {
            if(msg.deletable) {
                msg.delete();
            }
            if(message.deletable) {
                message.delete();
            }
           }, 15000));
       } else if(cmd.cooldown) {
           cmd.cooldowns[message.author.id] = Date.now() + ms(cmd.cooldown);
        setTimeout(() => {
            delete cmd.cooldowns[message.author.id];
        }, ms(cmd.cooldown));
    }
    
    cmd.execute(client, message, args);

       

}

const formatDate = (ms) => {
    var result = {};
    const days = Math.floor(ms / (24*60*60*1000));
    result["jours"] = days;
    const daysms = ms % (24*60*60*1000);
    const hours = Math.floor(daysms / (60*60*1000));
    result["heures"] = hours;
    const hoursms = ms % (60*60*1000);
    const minutes = Math.floor(hoursms / (60*1000));
    result["minutes"] = minutes;
    const minutesms = ms % (60*1000);
    const sec = Math.floor(minutesms / 1000);
    if(sec == 0) return "now";
    result["secondes"] = sec;
    var newresult = {};
    result = Object.keys(result).filter(key => result[key] != 0).forEach(xd => {
        newresult[xd] = result[xd];
    });

    if(newresult.length == 0) return "now";
    return Object.keys(newresult).map(key => `${newresult[key]} ${key}`).join(", ");
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978