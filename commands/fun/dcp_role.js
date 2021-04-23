const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class DeadChatPingRoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'dcp',
			group: 'fun',
			memberName: 'dcp',
			description: 'Get or remove the Dead Chat Ping role!',
		});
	}

	run(message, args) {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
		let words = args.split(' ');
        let reason = words.slice(0).join(' ');
		let DCPRole = message.guild.roles.cache.get(DCPPingRoleID);
		if (!reason){
			const IncorrectUsage = new discord.MessageEmbed()
				.setColor("#FFFF00")
				.setTitle("Incorrect Usage!")
				.setDescription(`
					-dcp get | This allows you to get the Dead Chat Ping Role
					-dcp remove | This allows you to remove the Dead Chat Ping Role
				`)
			message.channel.send(IncorrectUsage);
			return;
		}
		if (reason == "get"){
			message.member.roles.add(DCPRole);
			message.reply(`Successfully gave you the dead chat ping role! Do -dcp remove to remove the role!`);
		}
		if (reason == "remove"){
			message.member.roles.remove(DCPRole);
			message.reply(`Successfully removed the dead chat ping role! Do -dcp get to get the role!`);
		}
	}
};