const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class PollCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'poll',
			group: 'support',
			memberName: 'poll',
			description: 'Send a server poll!',
		});
	}

	run(message, args) {
        let words = args.split(' ');
        let poll = words.slice(0).join(' ');
        if(!poll){
            const NoArgumentsGiven = new discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription(`:warning: What is the poll`);
            return message.channel.send(NoArgumentsGiven).then(message => {
                message.delete({timeout: 10000});
            });
        }

        const PollMessage = new discord.MessageEmbed()
            .setTimestamp()
            .setColor("#20B2AA")
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setThumbnail(message.author.displayAvatarURL())
            .setTitle(`Poll`)
            .setDescription(`
                ${poll}
            `)
        let PollChannel = message.guild.channels.cache.get(PollChannelID);
		PollChannel.send(PollMessage).then(MessageEmbed => {
            MessageEmbed.react("✅");
            MessageEmbed.react("❌");
        });
	}
};