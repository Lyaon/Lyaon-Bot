const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class UnbanCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'unban',
			group: 'admin',
			memberName: 'unban',
			description: 'Unbans a user!',
		});
	}

	run(message, args) {
		if (message.guild === null){
            message.reply(DMMessage);
            return;
		}
		if (!message.member.hasPermission("BAN_MEMBERS")){
			const PermissionErrorMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(`${PermissionError}`)
			message.channel.send(PermissionErrorMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
		let words = args.split(' ');
		let reason = words.slice(1).join(' ');
        if(!words[0]){
			const NullUserMessage = new discord.MessageEmbed()
				.setColor()
				.setDescription(NullUser)
			message.channel.send(NullUserMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
		if (isNaN(words[0])){
			const NullUserMessage = new discord.MessageEmbed()
				.setColor()
				.setDescription("Please use a user ID!")
			message.channel.send(NullUserMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
        if (!reason){
			const NoReasonWarning = new discord.MessageEmbed()
				.setColor()
				.setDescription(`:warning: Please supply a reason for the unban!`)
			message.channel.send(NoReasonWarning).then(message => {
                message.delete({timeout: 10000});
			});
			return;
		}

		var UnbanViolationNumber = db.add(`{UnbanViolationNumber}_${words[0].id}`, 1);
		db.push(`{UnbanReason}_${words[0].id}`, `**Unban ${UnbanViolationNumber}:** [Mod: ${message.author} | Time: ${new Date().toLocaleString()}] ${words.slice(1).join(' ')}`);
		message.guild.members.unban(words[0]).catch(err => 
			console.log("Could not unabn user. Either user is already unbanned or there was an error!")
		);

		const ChatBanMessage = new discord.MessageEmbed()
			.setColor("0xFFA500")
			.setTimestamp()
			.setTitle("Unban")
			.setDescription(`
				**Moderator:** ${message.author}
				**User:** ${words[0]}
				**Reason:** ${reason}
			`)
		message.channel.send(ChatBanMessage);

		const UnBanLogMessage = new discord.MessageEmbed()
			.setColor("0xFFA500")
			.setTimestamp()
			.setTitle("Unban")
			.setDescription(`
				**Moderator:** ${message.author}
				**Banned User:** ${words[0]}
				**Reason:** ${reason}
			`)
		let LogChannel = message.guild.channels.cache.get(LogChannelID);
		LogChannel.send(UnBanLogMessage);
	}
};