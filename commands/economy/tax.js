const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class TaxCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'tax',
			group: 'economy',
			memberName: 'tax',
			description: 'Allows you to tax a user!',
		});
	}

	run(message, args) {
		if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
		if (!message.member.hasPermission("ADMINISTRATOR")){
			const PermissionErrorMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(`${PermissionError}`)
			message.channel.send(PermissionErrorMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
        let TaxedUser = message.guild.member(message.mentions.users.first());
        if(!TaxedUser){
			const NullUserMessage = new discord.MessageEmbed()
				.setColor()
				.setDescription(NullUser)
			message.channel.send(NullUserMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
		let words = args.split(' ');
		let tax = words.slice(1).join(' ');
		let Balance = db.get(`${message.mentions.users.first().id}.basic.money`); if (Balance == null)Balance = "0";
        if (!tax) return message.reply(`:warning: How much money do you want to tax ${TaxedUser.user.tag}?`).then(message => {
            message.delete({timeout: 10000});
		});
		if (isNaN(tax)){
            return message.reply("You can only use numbers for this command!").then(message => {
				message.delete({timeout: 5000});
            });
        }
		if(tax > db.get(`${message.mentions.users.first().id}.basic.money`)){
			return message.channel.send(`${TaxedUser.user.tag} doesn't have $${tax}! They only have $${Balance}!`).then(message => {
				message.delete({timeout: 10000});
			});
		}

		db.subtract(`${message.mentions.users.first().id}.basic.money`, tax);
		db.add(`GlobalMoneyConfirmationID`, 1);
		let GetConfirmationID = db.get(`GlobalMoneyConfirmationID`);
		db.push(`{ConfirmationMessage}_${message.author.id}`, `\n**PaymentID:** #${GetConfirmationID}\n**Date:** ${new Date().toLocaleString()}\n**Payment Type:** UserTax\n**TaxedUser:** ${TaxedUser}\n**Amount:** $${tax}\n`);
        message.reply(`Successfully taxed ${TaxedUser.user.tag} $${tax}!`);
	}
};