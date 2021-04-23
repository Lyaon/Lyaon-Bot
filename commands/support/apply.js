const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const token = require("../../Token.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class ApplyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'apply',
			group: 'support',
			memberName: 'apply',
			description: 'Apply for staff!',
		});
	}

	run(message, args) {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        if (db.get("settings.StaffApplications")== 0){
            message.reply("Sorry, staff applications are currently closed!");
            return;
        }
        let ApplyingUser = message.guild.member(message.mentions.users.first());
        let words = args.split(' ');
		let part1 = words.slice(1).join(' ');
        let reason = words.slice(2).join(' ');
        if (message.member.hasPermission("ADMINISTRATOR")){
            if (!ApplyingUser){
                const NullUserMessage = new discord.MessageEmbed()
                    .setColor()
                    .setDescription(NullUser)
                message.channel.send(NullUserMessage).then(message => {
                    message.delete({timeout: 10000});
                });
                return;
            }
            if (!part1){
                const NoPartWarning = new discord.MessageEmbed()
                    .setColor()
                    .setDescription(`:warning: Do you want to accept or deny an application?`)
                message.channel.send(NoPartWarning).then(message => {
                    message.delete({timeout: 10000});
                });
                return;
            }
            if (!reason){
                const NoReasonWarning = new discord.MessageEmbed()
                    .setColor()
                    .setDescription(`:warning: Please supply a reason for the application!`)
                message.channel.send(NoReasonWarning).then(message => {
                    message.delete({timeout: 10000});
                });
                return;
            }
            if (words[1] == "accept"){
                const AcceptMessage = new discord.MessageEmbed()
                    .setTimestamp()
                    .setColor("#00FF00")
                    .setThumbnail(message.mentions.users.first().displayAvatarURL())
                    .setTitle("Accepted Application")
                    .setDescription(`
                        Congradulations, you have been accepted for part 2 of the staff application process! You and the server owner will have a private meeting using a voice chat. Please DM the owner when you can attend the meeting and make sure to have a microphone and a quiet place ready!
                    `)
                ApplyingUser.send(AcceptMessage).catch(err =>
                    message.reply("Could not DM user. Requires manual conversation!")
                );

                const AcceptMessageLog = new discord.MessageEmbed()
                    .setTimestamp()
                    .setColor("#FFFF00")
                    .setThumbnail(message.mentions.users.first().displayAvatarURL())
                    .setTitle("Accepted Application Confirmation")
                    .setDescription(`
                        **User:** ${ApplyingUser}
                        **User ID:** ${ApplyingUser.id}
                        **Message:** ${reason}
                    `)
                message.member.send(AcceptMessageLog);
                return;
            }
            if (words[1] == "deny"){
                const DenyMessage = new discord.MessageEmbed()
                    .setTimestamp()
                    .setColor("#0000FF")
                    .setThumbnail(message.mentions.users.first().displayAvatarURL())
                    .setTitle("Accepted Rejected")
                    .setDescription(`
                        I'm sorry, your application was rejected. Better luck next time.
                    `)
                ApplyingUser.send(DenyMessage).catch(err =>
                    message.reply("Could not DM user. Requires manual conversation!")
                );

                const DenyMessageLog = new discord.MessageEmbed()
                    .setTimestamp()
                    .setColor("#FFFF00")
                    .setThumbnail(message.mentions.users.first().displayAvatarURL())
                    .setTitle("Accepted Application Denied")
                    .setDescription(`
                        **User:** ${ApplyingUser}
                        **User ID:** ${ApplyingUser.id}
                        **Message:** ${reason}
                    `)
                message.member.send(DenyMessageLog);
                return;
            }
            return;
        }
        if (message.member.hasPermission("MANAGE_MESSAGES")){
            message.reply("Sorry, your already a staff member! ;)");
            return;
        }
        if (db.get(`${message.author.id}.applications.ApplicationAttempts`)== 3){
            message.reply("Sorry, you have over 3 application attempts.");
            return;
        }
        if (db.get(`${message.author.id}.admin.Violations`) > 3){
            message.reply("Sorry, you have over 3 violations.");
            return;
        }
        //BUG Level check is inconsistant and may not DM the user but still sends the channel application
        if (db.get(`${message.author.id}.basic.level`)< 15){
            message.reply("Sorry, you must be level 15 or higher to apply.");
            return;
        }

        db.add(`${message.author.id}.applications.ApplicationAttempts`, 1);
		let Violations = db.get(`${message.author.id}.admin.Violations`); if (Violations == null)Violations = "0";
		let Warnings = db.get(`${message.author.id}.admin.Warnings`); if (Warnings == null)Warnings = "0";
		let Mutes = db.get(`${message.author.id}.admin.Mutes`); if (Mutes == null)Mutes = "0";
		let Kicks = db.get(`${message.author.id}.admin.Kicks`); if (Kicks == null)Kicks = "0";
		let Bans = db.get(`${message.author.id}.admin.Bans`); if (Bans == null)Bans = "0";

        const ApplicationMessage = new discord.MessageEmbed()
            .setTimestamp()
            .setColor("#0xde9a12")
            .setThumbnail(message.author.displayAvatarURL())
            .setTitle("Application")
            .setDescription(`
                Please fill out your application here: ${ApplicationLink}

                Note: Sharing this link will have you terminated from applying from staff!
            `)
            .setFooter(`This is your ${db.get(`${message.author.id}.applications.ApplicationAttempts`)}/3 attempt!`)
        message.member.send(ApplicationMessage).catch(err => {
            message.reply("I could not DM you! Please contact the server owner for support!");
        });

        const UserApplicationInfo = new discord.MessageEmbed()
            .setTimestamp()
            .setColor("#0000FF")
            .setThumbnail(message.author.displayAvatarURL())
            .setTitle("Application")
            .setDescription(`
                **User:** ${message.author}
                **User ID:** ${message.author.id}
                **Attempt:** ${db.get(`${message.author.id}.applications.ApplicationAttempts`)}/3
                **Total Offences:** ${Violations}
				**Other Offences:** Warnings: ${Warnings} | Mutes: ${Mutes} | Kicks: ${Kicks} | Bans: ${Bans}
            `)
		let ApplicationChannel = message.guild.channels.cache.get(ApplicationChannelID);
		ApplicationChannel.send(UserApplicationInfo);
	}
};