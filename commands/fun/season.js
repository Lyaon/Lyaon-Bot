const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class SeasonCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'season',
			group: 'fun',
			memberName: 'season',
			description: `Gives you the latest season role!`,
		});
	}

	run(message, args) {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        let SeasonRole = message.guild.roles.cache.get(SeasonRoleID);
		message.member.roles.add(SeasonRole);
        message.reply(`Successfully gave you Season 3 role!`);
	}
};