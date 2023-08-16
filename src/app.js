require('dotenv').config()
const { Client, IntentsBitField } = require('discord.js')
const { CommandKit } = require('commandkit')

const client = new Client({ 
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

client.on('ready', ()=> {
    console.log(`Logged in as ${client.user.tag}!`)
})

new CommandKit({
    client,
    commandsPath: `${__dirname}/commands`,
  });

client.login(process.env.TOKEN)