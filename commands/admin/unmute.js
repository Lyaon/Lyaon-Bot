const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");
const ms = require("ms");

module.exports = class UnmuteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'unmute',
			group: 'admin',
			memberName: 'unmute',
			description: 'Unmutes a user!',
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
        let UnmutedUser = message.guild.member(message.mentions.users.first());
        if (!UnmutedUser) {
			const NullUserMessage = new discord.MessageEmbed()
				.setColor()
				.setDescription(NullUser)
			message.channel.send(NullUserMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
        }
        if (UnmutedUser.hasPermission("MANAGE_MESSAGES")) {
            const StaffUserMessage = new discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription(StaffUser)
            message.channel.send(StaffUserMessage).then(message => {
                message.delete({timeout: 10000})
            });
            return;
        }
        if (db.get(`${message.mentions.users.first().id}.admin.CurrentlyMuted`)== 0){
            const UserAlreadyUnutedMessage = new discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription(UserAlreadyUnmuted)
            message.channel.send(UserAlreadyUnutedMessage);
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

		let Violations = db.get(`${message.mentions.users.first().id}.admin.Violations`); if (Violations == null)Violations = "0";
		let Warnings = db.get(`${message.mentions.users.first().id}.admin.Warnings`); if (Warnings == null)Warnings = "0";
		let Mutes = db.get(`${message.mentions.users.first().id}.admin.Mutes`); if (Mutes == null)Mutes = "0";
		let Kicks = db.get(`${message.mentions.users.first().id}.admin.Kicks`); if (Kicks == null)Kicks = "0";
		let Bans = db.get(`${message.mentions.users.first().id}.admin.Bans`); if (Bans == null)Bans = "0";
		let users = message.mentions.users.first();

        db.set(`${message.mentions.users.first().id}.admin.CurrentlyMuted`, 0);
        let MuteBypasses = db.get(`${message.mentions.users.first().id}.admin.TimesBypassedMute`); if (MuteBypasses == null)MuteBypasses = "0";
        db.delete(`${message.mentions.users.first().id}.admin.TimesBypassedMute`);
        let MuteRole = message.guild.roles.cache.get(MuteRoleID);
        UnmutedUser.roles.remove(MuteRole);
        let MemberRole = message.guild.roles.cache.get(NewMemberRoleID);
        UnmutedUser.roles.remove(MemberRole).then(function(){
            UnmutedUser.send(`You have been unmuted on ${message.guild.name} because, ${reason}.`).catch(err => 
                console.log(`Could not message unmuted user!`)
            );
        });

        const UnmuteChatMessage = new discord.MessageEmbed()
            .setTimestamp()
            .setColor("#33ab63")
            .setThumbnail(users.displayAvatarURL())
            .setTitle("Unmute")
            .setDescription(`
                **Moderator:** ${message.author}
                **User:** ${UnmutedUser}
                **Reason:** ${reason}
            `)
        message.channel.send(UnmuteChatMessage);

        const UnmuteLogMessage = new discord.MessageEmbed()
            .setTimestamp()
            .setColor("#33ab63")
            .setThumbnail(users.displayAvatarURL())
            .setTitle("Unmute")
            .setDescription(`
                **Moderator:** ${message.author}
                **User:** ${UnmutedUser}
                **User ID:** ${UnmutedUser.id}
                **Reason:** ${reason}
                **Bypasses:** ${MuteBypasses}
            `)
        let LogChannel = message.guild.channels.cache.get(LogChannelID);
        LogChannel.send(UnmuteLogMessage);
	}
};