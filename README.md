# 🎈 Bot Introduction

#### It’s a discord.js based utility bot.

# ✨ Bot ressource
## 🔑 Database:
* ### MongoDB

## 💻 Programming language:
* ### Js

## 🔩 Library used:
* ### [Discord.js(v13)](https://www.npmjs.com/package/discord.js)
* ### [Ascii table](https://www.npmjs.com/package/ascii-table)
* ### [Fs](https://www.npmjs.com/package/fs)
* ### [Mongoose](https://www.npmjs.com/package/mongoose)
* ### [PM2](https://www.npmjs.com/package/pm2)
* ### [Moment](https://www.npmjs.com/package/moment)
* ### [Ms](https://www.npmjs.com/package/ms)
* ### [Canvas](https://www.npmjs.com/package/canvas)
* ### [Discord-giveaways](https://www.npmjs.com/package/discord-giveaways)
* ### [Node-fetch](https://www.npmjs.com/package/node-fetch)

# 🛠 How to configure the bot
## ❗ You must complete two files that are
### ./src/Structure/Config/client
```js
module.exports = {
    token: "Your token",//Mandatory
    prefix: "Your prefix",//Mandatory
    mongoURL: "Your url mongodb",//Mandatory
    owner: 'Your id',//Mandatory
    thumbnailActive: 'True or false' //If you want to activate the thumbnail on embeds messages
}
```
### ./src/Structure/Config/embed
```js
module.exports = {
    color: 'html color', //mandatory
    footer: 'Your message footer',
    thumbnail: 'Your gif or images link'
    //(If you use giphy please check that the gifs are well in public otherwise its will not work) 
}
```
### and launch update.bat(windows) or update.sh(linux)

# ⚙ How to start the bot
### Launch start.bat(windows) or start.sh(linux) in Lunch bot folder
>### For windows if you have this is error
```
pm2: Unable to load C:\Users\AppData\Roaming\npm pm2.ps1, as script execution is disabled on this system. For more information, see about_Execution_Policies at 
https://go.microsoft.com/fwlink/?LinkID=135170.
At Line:1: 1
+pm2 start main.js
+~~~
    + CategoryInfo   : Security error: (:) [], PSSecurityException
    + FullyQualifiedErrorId: UnauthorizedAccess
```
>### Run powershell an admin and execute this command and access the windows request
```
Set-ExecutionPolicy RemoteSigned
```
>### And normally everything will be good
### I use the pm2 module which allows to run spots in the background so it will always stay on (be careful if you turn off your pc it will also turn off)



# 🏴 End of the readme
### The bot was made with ❤
### Don’t appropriate the code.It will be updated often. 
### My contact: PsychedelicsEyes.php#6978
### Discord server: discord.gg/punchnox