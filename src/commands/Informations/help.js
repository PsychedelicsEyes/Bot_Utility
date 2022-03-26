const { MessageActionRow, MessageSelectMenu } = require("discord.js");
const MessageEmbed = require("../../Structure/Client/Embed");
const ms = require("ms");

module.exports = {
    name: "help",
    description: "Cette commande vous aidera à utiliser le bot",
    usage: `\`help || (cmd)\``,
    execute: async(client, message, args) => {

        if(args.length != 0) {
            var cmd = client.commands.get(args[0]);
            if(!cmd) cmd = client.commands.get(client.aliases.get(args[0]));
            if(!cmd) return message.channel.send({content: ":x: | Cette commande n'existe pas !"});

            const embed = new MessageEmbed();

            embed.setTitle("Aide - " + cmd.name);
            if(cmd.hasOwnProperty("description")) {
                embed.addField("Description", `\`${cmd.description}\``);
            }
            if(cmd.hasOwnProperty("usage")) {
                embed.addField("Usage", `\`${cmd.usage}\``);
            }
            if(cmd.hasOwnProperty("permissions")) {
                if(Array.isArray(cmd.permissions)) {
                    embed.addField("Permissions", cmd.permissions.map(perm => `\`${perm}\``).join(", "));
                } else if (typeof(cmd.permissions) == "string") {
                    embed.addField("Permission", `\`${cmd.permissions}\``);
                }
                
            }

            if(cmd.hasOwnProperty("cooldown")) {
                embed.addField("Cooldown", `\`${ms(ms(cmd.cooldown), {long: true})}\``);
            }

            embed.setFooter({ text: embed.footer.text += ` | <> = obligatoire | () = facultatif`})

            return message.channel.send({embeds:[embed]}).catch();
            
        }
        var arrembed = [];
        const embed = new MessageEmbed();
        arrembed.push(embed);
        const row = new MessageActionRow();
        const selectmenu = new MessageSelectMenu();

        const info = client.categories.find(xd => xd.value == "informations");
        info.default = true;
        selectmenu.customId = "selectmenuhelp";
        selectmenu.addOptions(client.categories);
        row.addComponents(selectmenu);
        embed.setTitle("Aide - Informations");
        embed.setFooter({ text: embed.footer.text })
        let category = "informations";

        embed.addFields(client.commands.filter(cmd => cmd.category == category).map(cmd => {
            return {
                name: cmd.name,
                value: `\`${cmd.description}\``,
                inline: false
            }
        }));
        await message.channel.send({embeds:arrembed, components:[row]});
    }
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978