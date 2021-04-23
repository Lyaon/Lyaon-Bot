const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class PayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pay',
			group: 'economy',
			memberName: 'pay',
			description: 'Allows you to pay another user!',
		});
	}

	run(message, args) {
		if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        let PayedUser = message.guild.member(message.mentions.users.first());
        if(!PayedUser){
			const NullUserMessage = new discord.MessageEmbed()
				.setColor()
				.setDescription(NullUser)
			message.channel.send(NullUserMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
		if (message.mentions.users.first() == message.author){
            message.reply("I'm sorry, you can't pay your self!");
            return;
		}
		let words = args.split(' ');
		let Payment = words.slice(1).join(' ');
		let Balance = db.get(`${message.author.id}.basic.money`); if (Balance == null)Balance = "0";
        if (!Payment) return message.reply(`:warning: How much money do you want to pay ${PayedUser.user.tag}?`).then(message => {
            message.delete({timeout: 10000});
		});
		if(Payment > db.get(`${message.author.id}.basic.money`)){
			return message.channel.send(`You don't have enough money! You only have $${Balance}!`).then(message => {
				message.delete({timeout: 10000});
			});
		}

		db.add(`${message.mentions.users.first().id}.basic.money`, Payment);
		db.subtract(`${message.author.id}.basic.money`, Payment);
		db.add(`GlobalMoneyConfirmationID`, 1);
		let GetConfirmationID = db.get(`GlobalMoneyConfirmationID`);
		db.push(`{ConfirmationMessage}_${message.author.id}`, `\n**PaymentID:** #${GetConfirmationID}\n**Date:** ${new Date().toLocaleString()}\n**Payment Type:** UserPayment\n**PayedUser:** ${PayedUser}\n**Amount:** $${Payment}\n`);

		let user = message.mentions.users.first();
		const PaymentConfirmationMessage = new discord.MessageEmbed()
			.setTimestamp()
			.setColor("#85bb65")
			.setThumbnail(user.displayAvatarURL())
			.setTitle("Successful Payment")
			.setDescription(`
				**Payed User:** ${PayedUser.user.tag}
				**Amount:** $${Payment}
				**PaymentID:** #${db.get(`GlobalMoneyConfirmationID`)}
			`)
		message.channel.send(PaymentConfirmationMessage);
	}
};