const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class DiceRollCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'roll',
			group: 'fun',
			memberName: 'roll',
			description: 'Rolls a 6 sided dice!',
		});
	}

	run(message, args) {
        var diceRoll = Math.floor(Math.random() * 6) + 1;
        message.reply(`Your Dice landed on ${diceRoll}`);
	}
};