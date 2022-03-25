const { MessageEmbed } = require ('discord.js');
const { thumbnailActive } = require('../Config/client');
const config = require('../Config/embed');


module.exports = class LeaftaEmbed extends MessageEmbed {
    constructor(thumbnail) {
        super();

        this.setColor(config.color);
        this.setFooter({text: config.footer});

        if (thumbnailActive == "true") {
            this.setThumbnail(config.thumbnail)
        }
    }
}

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978