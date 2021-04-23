const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");
const ms = require("ms");

module.exports = class MuteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'mute',
			group: 'admin',
			memberName: 'mute',
			description: 'Mutes a user!',
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
        let MutedUser = message.guild.member(message.mentions.users.first());
        if (!MutedUser) {
			const NullUserMessage = new discord.MessageEmbed()
				.setColor()
				.setDescription(NullUser)
			message.channel.send(NullUserMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
        }
        if (MutedUser.hasPermission("MANAGE_MESSAGES")) {
            const StaffUserMessage = new discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription(StaffUser)
            message.channel.send(StaffUserMessage).then(message => {
                message.delete({timeout: 10000});
            });
            return;
        }
        if (db.get(`${message.mentions.users.first().id}.admin.CurrentlyMuted`)== 1){
            const UserAlreadyMutedMessage = new discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription(UserAlreadyMuted)
            message.channel.send(UserAlreadyMutedMessage);
            return;
        }
        let words = args.split(' ');
        let time = words[1];
        if (!time) {
			const NoReasonWarning = new discord.MessageEmbed()
				.setColor()
				.setDescription(`:warning: How much time do you want? Options [s, h, d or p for permanent mute]`)
			message.channel.send(NoReasonWarning).then(message => {
                message.delete({timeout: 10000});
			});
			return;
		}
        let reason = words.slice(2).join(' ');
        if (!reason) {
			const NoReasonWarning = new discord.MessageEmbed()
				.setColor()
				.setDescription(`:warning: Please supply a reason for the mute!`)
			message.channel.send(NoReasonWarning).then(message => {
                message.delete({timeout: 10000});
			});
			return;
		}

        db.add(`${message.mentions.users.first().id}.admin.Mutes`, 1);
		db.add(`${message.mentions.users.first().id}.admin.Violations`, 1);
		db.set(`${message.mentions.users.first().id}.admin.CurrentlyMuted`, 1);
		let Violations = db.get(`${message.mentions.users.first().id}.admin.Violations`); if (Violations == null)Violations = "0";
		let Warnings = db.get(`${message.mentions.users.first().id}.admin.Warnings`); if (Warnings == null)Warnings = "0";
		let Mutes = db.get(`${message.mentions.users.first().id}.admin.Mutes`); if (Mutes == null)Mutes = "0";
		let Kicks = db.get(`${message.mentions.users.first().id}.admin.Kicks`); if (Kicks == null)Kicks = "0";
		let Bans = db.get(`${message.mentions.users.first().id}.admin.Bans`); if (Bans == null)Bans = "0";
        let MemberRole = message.guild.roles.cache.get(NewMemberRoleID);
        let MuteRole = message.guild.roles.cache.get(MuteRoleID);
        let users = message.mentions.users.first();

        if (time == "p"){
            var MuteViolationNumber = db.add(`{MuteViolationNumber}_${message.mentions.users.first().id}`, 1);
		    db.push(`{MuteReason}_${message.mentions.users.first().id}`, `**TempMute ${MuteViolationNumber}:** [Mod: ${message.author} | Time: ${new Date().toLocaleString()}] Duration: Permanently\nReason: ${words.slice(2).join(' ')}`);
            MutedUser.roles.add(MuteRole);
            MutedUser.roles.remove(MemberRole).then(function(){
                MutedUser.send(`You have been permanently muted on ${message.guild.name} because, ${reason}.`).catch(err => {
                    console.log(`Could not message muted user!`);
                });
            });

            const ChatMuteMessage = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#FFA500")
                .setThumbnail(users.displayAvatarURL())
                .setTitle(`Mute`)
                .setDescription(`
                    **Moderator:** ${message.author}
                    **User:** ${MutedUser}
                    **Time:** Permanently
                    **Reason:** ${reason}
                `)
            message.channel.send(ChatMuteMessage);

            const MuteLogMessage = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#FFA500")
                .setThumbnail(users.displayAvatarURL())
                .setTitle(`Mute`)
                .setDescription(`
                    **Moderator:** ${message.author}
                    **User:** ${MutedUser}
                    **User ID:** ${MutedUser.id}
                    **Time:** Permanently
                    **Reason:** ${reason}
                    **Violations:** ${Violations}
                    **Other Violations:** Warnings: ${Warnings} | Mutes: ${Mutes} | Kicks: ${Kicks} | Bans: ${Bans}
                `)
            let LogChannel = message.guild.channels.cache.get(LogChannelID);
            return LogChannel.send(MuteLogMessage);
        }

        var MuteViolationNumber = db.add(`{MuteViolationNumber}_${message.mentions.users.first().id}`, 1);
		db.push(`{MuteReason}_${message.mentions.users.first().id}`, `**TempMute ${MuteViolationNumber}:** [Mod: ${message.author} | Time: ${new Date().toLocaleString()}] Duration: ${time}\nReason: ${words.slice(2).join(' ')}`);

		MutedUser.roles.add(MuteRole);
		MutedUser.roles.remove(MemberRole).then(function(){
			MutedUser.send(`You have been temporarily muted on ${message.guild.name} because, ${reason}.`).catch(err => 
                console.log(`Could not message muted user!`)
            );
		});

        const ChatMuteMessage = new discord.MessageEmbed()
            .setTimestamp()
            .setColor("#FFA500")
            .setThumbnail(users.displayAvatarURL())
            .setTitle(`TempMute`)
            .setDescription(`
                **Moderator:** ${message.author}
                **User:** ${MutedUser}
                **Time:** ${time}
                **Reason:** ${reason}
            `)
        message.channel.send(ChatMuteMessage);

        const MuteLogMessage = new discord.MessageEmbed()
            .setTimestamp()
            .setColor("#FFA500")
            .setThumbnail(users.displayAvatarURL())
            .setTitle(`TempMute`)
            .setDescription(`
                **Moderator:** ${message.author}
                **User:** ${MutedUser}
                **User ID:** ${MutedUser.id}
                **Time:** ${time}
                **Reason:** ${reason}
                **Violations:** ${Violations}
                **Other Violations:** Warnings: ${Warnings} | Mutes: ${Mutes} | Kicks: ${Kicks} | Bans: ${Bans}
            `)
        let LogChannel = message.guild.channels.cache.get(LogChannelID);
        LogChannel.send(MuteLogMessage);

        setTimeout(() => {
            var UnmuteViolationNumber = db.add(`{UnmuteViolationNumber}_${message.mentions.users.first().id}`, 1);
            db.push(`{UnmuteReason}_${message.mentions.users.first().id}`, `**TempMute ${UnmuteViolationNumber}:** [Mod: ${message.author} | Time: ${new Date().toLocaleString()}]\nReason: Times Up`);
            db.set(`${message.mentions.users.first().id}.admin.CurrentlyMuted`, 0);
			let MuteBypasses = db.get(`${message.mentions.users.first().id}.admin.TimesBypassedMute`); if (MuteBypasses == null)MuteBypasses = "0";
			db.delete(`${message.mentions.users.first().id}.admin.TimesBypassedMute`);
			let MuteRole = message.guild.roles.cache.get(MuteRoleID);
			MutedUser.roles.remove(MuteRole);
			let MemberRole = message.guild.roles.cache.get(NewMemberRoleID);
			MutedUser.roles.remove(MemberRole).then(function(){
				MutedUser.send(`You have been unmuted on ${message.guild.name} because, ${reason}.`).catch(err => 
                    console.log(`Could not message unmuted user!`)
                );
			});

            const UnmuteLogMessage = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#33ab63")
                .setThumbnail(users.displayAvatarURL())
                .setTitle("Unmute")
                .setDescription(`
                    **Moderator:** <@${BotID}>
                    **User:** ${MutedUser}
                    **User ID:** ${MutedUser.id}
                    **Reason:** ${reason}
                    **Time:** ${time}
                    **Bypasses:** ${MuteBypasses}
                    **Violations:** ${Violations}
                    **Other Violations:** Warnings: ${Warnings} | Mutes: ${Mutes} | Kicks: ${Kicks} | Bans: ${Bans}
                `)
            let LogChannel = message.guild.channels.cache.get(LogChannelID);
            LogChannel.send(UnmuteLogMessage);
        }, ms(`${time}`));
	}
};