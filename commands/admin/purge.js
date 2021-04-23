const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class PurgeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'purge',
			group: 'admin',
			memberName: 'purge',
			description: 'Remove a large amount of messages!',
		});
	}

	run(message, args) {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
		if(!message.member.hasPermission("MANAGE_MESSAGES"))
        {
            message.channel.send(PermissionError).then(message => {
				message.delete({timeout: 10000});
			});
            return;
		}
        let words = args.split(' ');
		let DeletedMessage = words.slice(0).join(' ');
		if (isNaN(args[0])){
			message.reply("You can only use numbers for this command!");
			return;
		}
		if (words[0].includes(".")){
			message.reply("You can't use decimal numbers!");
			return;
		}
		if (!DeletedMessage){
			message.reply("Incomplete command! Example: -purge 5");
			return;
		}
		if (DeletedMessage < 1){
			message.reply("You must purge 2 or more messages!");
			return;
		}
		if (DeletedMessage > 100){
			message.reply("You must purge 100 or less messages!");
			return;
		}
		message.channel.bulkDelete(words[0]);

		const PurgeLogMessage = new discord.MessageEmbed()
			.setTimestamp()
			.setColor("#187ddb")
			.setThumbnail(message.author.displayAvatarURL())
			.setTitle("Purged Messages")
			.setDescription(`
				**User:** ${message.author}
				**Amount:** ${args[0]}
			`)
		let LogChannel = message.guild.channels.cache.get(ModLogID);
		LogChannel.send(PurgeLogMessage);
	}
};