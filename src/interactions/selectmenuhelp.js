const LeaftaEmbed = require('../Structure/Client/Embed');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "selectmenuhelp",
    execute: async(interaction) => {

        const category = interaction.values[0];
        const row = new MessageActionRow();
        const selectmenu = interaction.message.components[0].components.find(compo => compo.type == "SELECT_MENU");
        const embed = interaction.message.embeds[0];

        embed.fields = interaction.client.commands.filter(cmd => cmd.category == category).map(cmd => {
            return {
                name: cmd.name,
                value: `\`${cmd.description}\``,
                inline: false
            }
        });

        selectmenu.options.find(option => option.default == true).default = false;
        
        const categories = selectmenu.options.find(option => option.value === category);
        categories.default = true;
        embed.title = `Aide - ${categories.label}`;
        row.addComponents(selectmenu);
        interaction.update({embeds: [embed], components:[row]});
    }
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978