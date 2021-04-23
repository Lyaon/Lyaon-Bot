const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class RankCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rank',
			group: 'fun',
			memberName: 'rank',
			description: 'Shows you yours or someone elses rank!',
		});
	}

	run(message, args) {
        if (message.mentions.users.first()){
            let MentionedUserLevel = db.get(`${message.mentions.users.first().id}.basic.level`); if (MentionedUserLevel == null)MentionedUserLevel = "0";
            let MentionedUserXP = db.get(`${message.mentions.users.first().id}.basic.xp`); if (MentionedUserXP == null)MentionedUserXP = "0";

            const MentionUser = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#34b7eb")
                .setThumbnail(message.mentions.users.first().displayAvatarURL())
                .setTitle("Rank")
                .setDescription(`
                    **User:** ${message.mentions.users.first()}
                    **Level:** ${MentionedUserLevel}
                    **XP:** ${MentionedUserXP}
                `)
            message.channel.send(MentionUser);
        }else{
            let YourLevel = db.get(`${message.author.id}.basic.level`); if (YourLevel == null)YourLevel = "0";
            let YourXP = db.get(`${message.author.id}.basic.xp`); if (YourXP == null)YourXP = "0";

            const YourRank = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#34b7eb")
                .setThumbnail(message.author.displayAvatarURL())
                .setTitle("Rank")
                .setDescription(`
                    **Level:** ${YourLevel}
                    **XP:** ${YourXP}
                `)
            message.channel.send(YourRank);
        }
	}
};