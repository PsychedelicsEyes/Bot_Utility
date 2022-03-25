# Bot Introduction

#### It’s a discord.js based utility bot.
#### I based it on a cmd handler that [ramok](https://github.com/RamokTVL) made me.I added and updated something 


# Bot resource

## Database:
* ### MongoDB

## Programming language:
* ### Js

## Library used:
* ### Discord.js (v13)
* ### Table ascii
* ### Fs
* ### Mongoose

# How to configure the bot
## You must complete two files that are
### ./src/Structure/Config/client
```
module.exports = {
    token: "Your token",
    prefix: "Your prefix",
    mongoURL: "Your url mongodb",
    thumbnailActive: 'If you want to activate the thumbnail on embeds messages' //true or false
}
```
### ./src/Structure/Config/embed
```
module.exports = {
    color: 'html color', //mandatory
    footer: 'Your message footer',
    thumbnail: 'Your gif or images link'
    //(If you use giphy please check that the gifs are well in public otherwise its will not work) 
}
```

# End of the readme
### The bot was made with the heart so please don’t appropriate the code.It will be updated often.
### My contact: PsychedelicsEyes.php#6978
### Discord server: discord.gg/punchnox