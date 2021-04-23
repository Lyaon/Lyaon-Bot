const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class BanCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ban',
			group: 'admin',
			memberName: 'ban',
			description: 'Bans a user from the server!',
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
		let BannedUser = message.guild.member(message.mentions.users.first());
        if(!BannedUser) {
			const NullUserMessage = new discord.MessageEmbed()
				.setColor()
				.setDescription(NullUser)
			message.channel.send(NullUserMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
		if (BannedUser.hasPermission("MANAGE_MESSAGES")){
			const StaffUserMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(StaffUser)
			message.channel.send(StaffUserMessage).then(message => {
				message.delete({timeout: 10000});
			});
            return;
		}
		let words = args.split(' ');
		let reason = words.slice(1).join(' ');
        if (!reason){
			const NoReasonWarning = new discord.MessageEmbed()
				.setColor()
				.setDescription(`:warning: Please supply a reason for the ban!`)
			message.channel.send(NoReasonWarning).then(message => {
                message.delete({timeout: 10000});
			});
			return;
		}

		db.add(`${message.mentions.users.first().id}.admin.Bans`, 1);
		db.add(`${message.mentions.users.first().id}.admin.Violations`, 1);
		var BanViolationNumber = db.add(`{BanViolationNumber}_${message.mentions.users.first().id}`, 1);
		db.push(`{BanReason}_${message.mentions.users.first().id}`, `**Ban ${BanViolationNumber}:** [Mod: ${message.author} | Time: ${new Date().toLocaleString()}] ${words.slice(1).join(' ')}`);
		let Violations = db.get(`${message.mentions.users.first().id}.admin.Violations`); if (Violations == null)Violations = "0";
		let Warnings = db.get(`${message.mentions.users.first().id}.admin.Warnings`); if (Warnings == null)Warnings = "0";
		let Mutes = db.get(`${message.mentions.users.first().id}.admin.Mutes`); if (Mutes == null)Mutes = "0";
		let Kicks = db.get(`${message.mentions.users.first().id}.admin.Kicks`); if (Kicks == null)Kicks = "0";
		let Bans = db.get(`${message.mentions.users.first().id}.admin.Bans`); if (Bans == null)Bans = "0";
		let users = message.mentions.users.first();

		BannedUser.send(`You have been ban from ${message.guild.name} because, ${reason}.`).catch(err => 
			console.log(`Could not message banned user!`)
		);
        BannedUser.ban({reason: reason});

		const ChatBanMessage = new discord.MessageEmbed()
			.setTimestamp()
			.setColor("#FF0000")
			.setThumbnail(users.displayAvatarURL())
			.setTitle("Ban")
			.setDescription(`
				**Moderator:** ${message.author}
				**User:** ${BannedUser}
				**Reason:** ${reason}
			`)
		message.channel.send(ChatBanMessage);

		const BanLogMessage = new discord.MessageEmbed()
			.setTimestamp()
			.setColor("#FF0000")
			.setThumbnail(users.displayAvatarURL())
			.setTitle("Ban")
			.setDescription(`
				**Moderator:** ${message.author}
				**User:** ${BannedUser}
				**User ID:** ${BannedUser.id}
				**Reason:** ${reason}
				**Violations:** ${Violations}
				**Other Violations:** Warnings: ${Warnings} | Mutes: ${Mutes} | Kicks: ${Kicks} | Bans: ${Bans}
			`)
			let LogChannel = message.guild.channels.cache.get(LogChannelID);
		LogChannel.send(BanLogMessage);
	}
};