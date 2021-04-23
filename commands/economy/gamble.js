const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class WalletCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'gamble',
			group: 'economy',
			memberName: 'gamble',
			description: 'Allows you to gamble!',
		});
	}

	run(message, args) {
        let words = args.split(' ');
        let bet = words.slice(0).join(' ');
        let extra = words.slice(1).join(' ');
        let bal = db.get(`${message.author.id}.basic.money`);if (bal == null)bal = "0";

		if (!bet){
			return message.reply("How much money do you want to bet?").then(message => {
				message.delete({timeout: 5000});
            });
		}
        if (isNaN(args[0])){
            return message.reply("You can only use numbers for the bet!").then(message => {
				message.delete({timeout: 5000});
            });
        }
        if (extra){
            return message.reply("Incorrect usage of command! Example: -gamble 1000").then(message => {
				message.delete({timeout: 5000});
            });
        }
        if (bet < 1000)return message.reply("You must bet $1000 or more to use this command!").then(message => {
            message.delete({timeout: 5000});
        });
        if (bet > bal)return message.reply(`You don't have enough money! You only have **$${bal}**!`).then(message => {
            message.delete({timeout: 5000});
        });
        db.subtract(`${message.author.id}.basic.money`, bet);
        db.add(`GlobalMoneyConfirmationID`, 1);
		let GetConfirmationID = db.get(`GlobalMoneyConfirmationID`);
		db.push(`{ConfirmationMessage}_${message.author.id}`, `\n**PaymentID:** #${GetConfirmationID}\n**Date:** ${new Date().toLocaleString()}\n**Payment Type:** Gamble\n**Amount:** $${bet}\n`);
        var Chance = Math.floor(Math.random() * 15);
        var ChanceCompare = Math.floor(Math.random() * 15);
        if (Chance == ChanceCompare){
            var Prize = Math.floor(Math.random() * 5000);
            db.add(`${message.author.id}.basic.money`, Prize);
            if (Prize < bet)return message.channel.send(`Congradulations ${message.author}! You just won **$${Win}** but, you still lost **$${bet-Win}**. :face_with_monocle:`);
            if (Prize == bet)return message.channel.send(`Congradulations ${message.author}! You got your **$${bet}** back! :dollar:`);
            if (Prize > bet)return message.reply(`Congradulation ${message.author}! You just won **$${Prize}!** :moneybag:`);
        }else{
            let Newbal = db.get(`${message.author.id}.basic.money`);if (Newbal == null)Newbal = "0";
            if (Newbal > 1000){
                message.reply(`Better luck next time. Why not try again? You still have **$${Newbal}**!`);
            }else{
                message.reply("You lost, better luck next time!");
            }
        }
	}
};