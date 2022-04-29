const LeaftaClient = require('./src/Structure/Client/Client');
const client = new LeaftaClient();

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