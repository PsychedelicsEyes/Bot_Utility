const mongoose = require("mongoose");
const config = require("../Structure/Config/client");

module.exports = mongoose.model('guild', new mongoose.Schema({
    _id: {type: String, required: true},
    prefix: {type: String, required: false, default: config.prefix},
    logsChannelId: {type: String, required: false, default: null}
}, {
    versionKey: false
}))

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978