const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class BugCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'settings',
			group: 'bot',
			memberName: 'settings',
			description: 'Control and change the bot settings.',
		});
	}

	run(message, args) {
        if (!message.member.hasPermission("ADMINISTRATOR")){
			const PermissionErrorMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(`${PermissionError}`)
			message.channel.send(PermissionErrorMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
        let words = args.split(' ');
        let settings = words.slice(0).join(' ');

        if (settings == "help"){
            const SettingsHelpMessage = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#FFA500")
                .attachFiles('./Images/SettingsCog.png')
                .setThumbnail('attachment://SettingsCog.png')
                .setTitle("Settings Help")
                .setDescription(`
                    1. Level Up System
                    2. Dead Chat Pings
                    3. Auto Moderation
                    4. Applications

                    To turn a setting off or on, do -setting <number> on/off
                    Example: -setting 1 off
                `)
            message.channel.send(SettingsHelpMessage);
            return;
        }

        //Level Up Settings
        if (settings == "1 on"){
            db.set("settings.LevelUpSystem", 1);
            message.reply("Successfully turned on Level Ups!");
            return;
        }
        if (settings == "1 off"){
            db.set("settings.LevelUpSystem", 0);
            message.reply("Successfully turned off Level Ups!");
            return;
        }
        //Dead Chat Ping Settings
        if (settings == "2 on"){
            db.set("settings.DeadChatPings", 1);
            message.reply("Successfully turned on Dead Chat Pings!");
            return;
        }
        if (settings == "2 off"){
            db.set("settings.DeadChatPings", 0);
            message.reply("Successfully turned off Dead Chat Pings!");
            return;
        }
        //Auto Moderation Settings
        if (settings == "3 on"){
            db.set("settings.AutoModeration", 1);
            message.reply("Successfully turned on Auto Moderation!");
            return;
        }
        if (settings == "3 off"){
            db.set("settings.AutoModeration", 0);
            message.reply("Successfully turned off Auto Moderation!");
            return;
        }
        //Staff Application Settings
        if (settings == "4 on"){
            db.set("settings.StaffApplications", 1);
            message.reply("Successfully turned on Staff Applications!");
            return;
        }
        if (settings == "4 off"){
            db.set("settings.StaffApplications", 0);
            message.reply("Successfully turned off Staff Applications!");
            return;
        }

        let LevelUpSetting = db.get("settings.LevelUpSystem"); if (LevelUpSetting == 1)LevelUpSetting = ":white_check_mark: On"; else LevelUpSetting = ":x: Off"
        let DeadChatPingSetting = db.get("settings.DeadChatPings"); if (DeadChatPingSetting == 1)DeadChatPingSetting = ":white_check_mark: On"; else DeadChatPingSetting = ":x: Off"
        let AutoModerationSetting = db.get("settings.AutoModeration"); if (AutoModerationSetting == 1)AutoModerationSetting = ":white_check_mark: On"; else AutoModerationSetting = ":x: Off"
        let StaffApplicationSetting = db.get("settings.StaffApplications"); if (StaffApplicationSetting == 1)StaffApplicationSetting = ":white_check_mark: On"; else StaffApplicationSetting = ":x: Off"

        const SettingsMessage = new discord.MessageEmbed()
            .setTimestamp()
            .setColor("#FFA500")
            .attachFiles('./Images/SettingsCog.png')
            .setThumbnail('attachment://SettingsCog.png')
            .setTitle("Settings")
            .setDescription(`
                **Staff Applications:** ${StaffApplicationSetting}
                **Dead Chat Pings:** ${DeadChatPingSetting}
                **Auto Moderation:** ${AutoModerationSetting}
                **Level Ups:** ${LevelUpSetting}
            `)
        message.channel.send(SettingsMessage);
	}
};