const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class WalletCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bal',
			group: 'economy',
			memberName: 'bal',
			description: 'Tells you how much money you have!',
		});
	}

	run(message, args) {
        let MentionedUser = message.mentions.users.first();
        if (MentionedUser){
            let MentionedUserBalenceAmount = db.get(`${message.mentions.users.first().id}.basic.money`); if (MentionedUserBalenceAmount == null)MentionedUserBalenceAmount = "0";

            let MentionUsersBalence = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#008000")
                .setThumbnail(MentionedUser.displayAvatarURL())
                .setTitle(`${MentionedUser.tag} Wallet`)
                .setDescription(`
                    **Balence:** $${MentionedUserBalenceAmount} :moneybag:
                `)
            message.channel.send(MentionUsersBalence);
        }else{
            let UserBalenceAmount = db.get(`${message.author.id}.basic.money`); if (UserBalenceAmount == null)UserBalenceAmount = "0";

            const UserBalence = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#008000")
                .setThumbnail(message.author.displayAvatarURL())
                .setTitle(`${message.author.tag} Wallet`)
                .setDescription(`
                    :moneybag: **Balence:** $${UserBalenceAmount}
                `)
            message.channel.send(UserBalence);
        }
	}
};