const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class SuggestCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'suggest',
			group: 'support',
			memberName: 'suggest',
			description: 'Send a suggestion!',
		});
	}

	run(message, args) {
        let words = args.split(' ');
        let suggestion = words.slice(0).join(' ');
        if(!suggestion){
            const NoSuggestionMessage = new discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription(`:warning: ${message.author}, what is your suggestion?`);
            return message.channel.send(NoSuggestionMessage).then(message => {
                message.delete({timeout: 10000});
            });
        }
        
        message.delete();
        const SuggestionMessage = new discord.MessageEmbed()
            .setTimestamp()
            .setColor("#20B2AA")
            .setThumbnail(message.author.displayAvatarURL())
            .setTitle(`Suggestion`)
            .setDescription(`
                **User:** ${message.author}
                **Suggestion:** ${suggestion}
            `)
        let SuggestionChannel = message.guild.channels.cache.get(SuggestionChannelID);
		SuggestionChannel.send(SuggestionMessage).then(MessageEmbed => {
            MessageEmbed.react("✅");
            MessageEmbed.react("❌");
        }).catch(err => {
            message.reply("Please shorten your suggestion!");
        });
	}
};