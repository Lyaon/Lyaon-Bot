const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class KickCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kick',
			group: 'admin',
			memberName: 'kick',
			description: 'Kicks a user from the server!',
		}); 
	}

	run(message, args) {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
		}
		if (!message.member.hasPermission("KICK_MEMBERS")){
			const PermissionErrorMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(`${PermissionError}`)
			message.channel.send(PermissionErrorMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
		let KickedUser = message.guild.member(message.mentions.users.first());
        if(!KickedUser) {
			const NullUserMessage = new discord.MessageEmbed()
				.setColor()
				.setDescription(NullUser)
			message.channel.send(NullUserMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
		if (KickedUser.hasPermission("MANAGE_MESSAGES")){
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
				.setDescription(`:warning: Please supply a reason for the kick!`)
			message.channel.send(NoReasonWarning).then(message => {
                message.delete({timeout: 10000});
			});
			return;
		}

		db.add(`${message.mentions.users.first().id}.admin.Kicks`, 1);
		db.add(`${message.mentions.users.first().id}.admin.Violations`, 1);
		var KickViolationNumber = db.add(`{KickViolationNumber}_${message.mentions.users.first().id}`, 1);
		db.push(`{KickReason}_${message.mentions.users.first().id}`, `**Kick ${KickViolationNumber}:** [Mod: ${message.author} | Time: ${new Date().toLocaleString()}] \n${words.slice(1).join(' ')}`);
		let Violations = db.get(`${message.mentions.users.first().id}.admin.Violations`); if (Violations == null)Violations = "0";
		let Warnings = db.get(`${message.mentions.users.first().id}.admin.Warnings`); if (Warnings == null)Warnings = "0";
		let Mutes = db.get(`${message.mentions.users.first().id}.admin.Mutes`); if (Mutes == null)Mutes = "0";
		let Kicks = db.get(`${message.mentions.users.first().id}.admin.Kicks`); if (Kicks == null)Kicks = "0";
		let Bans = db.get(`${message.mentions.users.first().id}.admin.Bans`); if (Bans == null)Bans = "0";
		let users = message.mentions.users.first();

		KickedUser.send(`You have been kicked from ${message.guild.name} because, ${reason}. Reinvite Link: https://discord.gg/wKVu2Cq`).catch(err => 
			console.log(`Could not message kicked user!`)
		);
		KickedUser.kick(reason);

		const ChatKickMessage = new discord.MessageEmbed()
			.setTimestamp()
			.setColor("#6a0dad")
			.setThumbnail(users.displayAvatarURL())
			.setTitle("Kick")
			.setDescription(`
				**Moderator:** ${message.author}
				**User:** ${KickedUser}
				**Reason:** ${reason}
			`)
		message.channel.send(ChatKickMessage);

		const KickLogMessage = new discord.MessageEmbed()
			.setTimestamp()
			.setColor("#6a0dad")
			.setThumbnail(users.displayAvatarURL())
			.setTitle("Kick")
			.setDescription(`
				**Moderator:** ${message.author}
				**User:** ${KickedUser}
				**User ID:** ${KickedUser.id}
				**Reason:** ${reason}
				**Violations:** ${Violations}
				**Other Violations:** Warnings: ${Warnings} | Mutes: ${Mutes} | Kicks: ${Kicks} | Bans: ${Bans}
			`)
			let LogChannel = message.guild.channels.cache.get(LogChannelID);
		LogChannel.send(KickLogMessage);
	}
};