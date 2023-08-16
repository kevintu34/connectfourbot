const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('@discordjs/builders')
const { ApplicationCommandOptionType, ChatInputCommandInteraction, ButtonStyle } = require('discord.js')

//sets the board state using arrays to represent the columns, O being empty squares
const columns = [
    {number: "1", emoji: "1️⃣", value: ["O", "O", "O", "O", "O", "O"]},
    {number: "2", emoji: "2️⃣", value: ["O", "O", "O", "O", "O", "O"]},
    {number: "3", emoji: "3️⃣", value: ["O", "O", "O", "O", "O", "O"]},
    {number: "4", emoji: "4️⃣", value: ["O", "O", "O", "O", "O", "O"]},
    {number: "5", emoji: "5️⃣", value: ["O", "O", "O", "O", "O", "O"]},
    {number: "6", emoji: "6️⃣", value: ["O", "O", "O", "O", "O", "O"]},
    {number: "7", emoji: "7️⃣", value: ["O", "O", "O", "O", "O", "O"]},
]

module.exports = {
    run: async ({interaction}) => {
        try {
            const targetUser = interaction.options.getUser("user")

            //checks if the user tagged themselves
            if(interaction.user.id === targetUser.id) {
                interaction.reply({
                    content: 'You cannot play Connect 4 with yourself.',
                    ephemeral: true,
                })

                return
            }

            //checks if the user tagged a bot
            if(targetUser.bot) {
                interaction.reply({
                    content: 'You cannot play Connect 4 with a bot.',
                    ephemeral: true,
                })

                return
            }

            const embed = new EmbedBuilder()
                .setTitle("Connect 4")
                .setDescription(`It's currently ${targetUser}'s turn.`)
                .setColor('Yellow')
                .setTimestamp(new Date())
            
            const buttons = columns.map((column)=> {
                return new ButtonBuilder()
                    .setCustomId(column.number)
                    .setLabel(column.number)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(column.emoji)
            })

            const row = new ActionRowBuilder().addComponents(buttons)

            const reply = await interaction.reply({
                content: `${targetUser}, you have been challenged to Connect 4, ${interaction.user}. To start playing, click one of the buttons below.`,
                embeds: [embed],
                components: [row],
            })

        } catch (error) {
            console.log('Error in Con 4')
            console.error(error)
        }
    },

    data: {
        name: 'con4',
        description: 'Play Connect 4 with another user.',
        dm_permission: false,
        options: [
            {
                name: 'user',
                description: "The user you want to play with.",
                type: ApplicationCommandOptionType.User,
                required: true
            }
        ]
    }
}