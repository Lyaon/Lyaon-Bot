const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class BugCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bug',
			group: 'support',
			memberName: 'bug',
			description: 'Sends a bug report!',
		});
	}

	run(message, args) {
        let words = args.split(' ');
        let bug = words.slice(0).join(' ');
        if(!bug){
            const NoBugReportMessage = new discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription(`:warning: ${message.author}, what is the bug?`);
            return message.channel.send(NoBugReportMessage).then(message => {
                message.delete({timeout: 10000});
            });
        }
        message.delete();
        db.add("BugNumber", 1);

        const BugReportMessage = new discord.MessageEmbed()
            .setTimestamp()
            .setColor("#FFA500")
            .setThumbnail(message.author.displayAvatarURL())
            .setTitle(`Bug Report ${db.get("BugNumber")}`)
            .setDescription(`
                **User:** ${message.author}
                **Bug:** ${bug}
            `)
            .setFooter(`Bot Info\nVersion: ${Version} | BuildID: ${BuildID}`)
        let BugReportChannel = message.guild.channels.cache.get(BugChannelID);
		BugReportChannel.send(BugReportMessage).catch(err => {
            message.reply("Please shorten your suggestion!");
        });
	}
};