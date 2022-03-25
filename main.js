const LeaftaClient = require('./src/Structure/Client/Client');
const fs = require('fs');
const client = new LeaftaClient();
const ascii = require('ascii-table');
var tableC = new ascii('Commands');
var tableE = new ascii('Events');
var tableI = new ascii('Interactions');

tableE 
    .setHeading('Event', 'Load Status');
tableC
    .setHeading('Command', 'Load Status');
tableI
    .setHeading('Interactions', 'Load Status');

fs.readdirSync("src/commands", {withFileTypes: true}).filter(dirent => dirent.isDirectory() && fs.readdirSync(`src/commands/${dirent.name}`).length > 1).forEach(foldername => {
    if(!client.categories.includes(foldername.name)) {
        const categoryinfo = JSON.parse(fs.readFileSync(`src/commands/${foldername.name}/category.json`));
        client.categories.push({...categoryinfo, label: foldername.name, value: foldername.name.toLowerCase(), default: false});
    }

    fs.readdirSync(`src/commands/${foldername.name}`, {withFileTypes: true}).filter(dirent => dirent.isFile() && dirent.name.endsWith(".js")).map(file => file.name).forEach(filename => {
        const cmd = require(`./src/commands/${foldername.name}/${filename}`);
        if(!cmd) return;
        if(cmd.cooldown) cmd.cooldowns = {};
        if(!cmd.name) {
            tableC
                .addRow(cmd.name, "Error name");
        } else {
            if(cmd.cooldown) cmd.cooldowns = {};
            cmd.category = foldername.name.toLowerCase();
            client.commands.set(cmd.name, cmd)
            tableC.addRow(cmd.name, "Ready");
        }

        if(cmd.aliases && Array.isArray(cmd.aliases)) {
            cmd.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.name);
            });
       }
    });
})
console.log(tableC.toString());

fs.readdirSync("./src/events", {withFileTypes: true}).filter(dirent => dirent.isFile() && dirent.name.endsWith(".js")).forEach(event => {
    const eventFile = require(`./src/events/${event.name}`);
    if(!eventFile.event) return;
    const eventType = event.name.substring(0, event.name.indexOf(".js"));
    client.on(eventType, eventFile.event);
    tableE.addRow(event.name, "Ready");
});
console.log(tableE.toString());

fs.readdirSync("src/interactions", {withFileTypes: true}).filter(dirent => dirent.isFile() && dirent.name.endsWith(".js")).forEach(interactionfile => {
    const interactionReq = require(`./src/interactions/${interactionfile.name}`);
    if(!interactionReq.name) return;
    tableI.addRow(interactionfile.name, "Ready");
    client.interactions.set(interactionReq.name, interactionReq);
});
console.log(tableI.toString());

process.on("uncaughtException", (error, origin) => {
    console.log("An error occured");
    console.log(error);
    console.log(origin);
});

process.on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled Rejection : " + reason);
    console.log(promise)
});

//Copyright PsychedelicsEyes
//Contact: PsychedelicsEyes.php#6978