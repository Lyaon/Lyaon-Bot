const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class WarnCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'warn',
			group: 'admin',
			memberName: 'warn',
			description: 'Warns a user!',
		});
	}

	run(message, args) {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        if (!message.member.hasPermission("MANAGE_MESSAGES")){
			const PermissionErrorMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(`${PermissionError}`)
			message.channel.send(PermissionErrorMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
		let WarnedUser = message.guild.member(message.mentions.users.first());
        if(!WarnedUser) {
			const NullUserMessage = new discord.MessageEmbed()
				.setColor()
				.setDescription(NullUser)
			message.channel.send(NullUserMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
		if (WarnedUser.hasPermission("MANAGE_MESSAGES")){
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
				.setDescription(`:warning: Please supply a reason for the warning!`)
			message.channel.send(NoReasonWarning).then(message => {
                message.delete({timeout: 10000});
			});
			return;
		}

		db.add(`${message.mentions.users.first().id}.admin.Warnings`, 1);
		db.add(`${message.mentions.users.first().id}.admin.Violations`, 1);
		var WarningViolationNumber = db.add(`{WarningViolationNumber}_${message.mentions.users.first().id}`, 1);
		db.push(`{WarnReason}_${message.mentions.users.first().id}`, `**Warning ${WarningViolationNumber}:** [Mod: ${message.author} | Time: ${new Date().toLocaleString()}] \n${words.slice(1).join(' ')}`);
		let Violations = db.get(`${message.mentions.users.first().id}.admin.Violations`); if (Violations == null)Violations = "0";
		let Warnings = db.get(`${message.mentions.users.first().id}.admin.Warnings`); if (Warnings == null)Warnings = "0";
		let Mutes = db.get(`${message.mentions.users.first().id}.admin.Mutes`); if (Mutes == null)Mutes = "0";
		let Kicks = db.get(`${message.mentions.users.first().id}.admin.Kicks`); if (Kicks == null)Kicks = "0";
		let Bans = db.get(`${message.mentions.users.first().id}.admin.Bans`); if (Bans == null)Bans = "0";
		let users = message.mentions.users.first();

        const ChatWarnMessage = new discord.MessageEmbed()
			.setTimestamp()
			.setColor("#FFA500")
			.setThumbnail(users.displayAvatarURL())
			.setTitle("Warning")
			.setDescription(`
				**Moderator:** ${message.author}
				**User:** ${WarnedUser}
				**Reason:** ${reason}
			`)
        message.channel.send(ChatWarnMessage);

        const WarnLogMessage = new discord.MessageEmbed()
            .setTimestamp()
            .setColor("#FFA500")
			.setThumbnail(users.displayAvatarURL())
			.setTitle("Warning")
			.setDescription(`
				**Moderator:** ${message.author}
				**User:** ${WarnedUser}
				**User ID:** ${WarnedUser.id}
				**Reason:** ${reason}
				**Violations:** ${Violations}
				**Other Violations:** Warnings: ${Warnings} | Mutes: ${Mutes} | Kicks: ${Kicks} | Bans: ${Bans}
			`)
        let LogChannel = message.guild.channels.cache.get(LogChannelID);
		LogChannel.send(WarnLogMessage);
	}
};