const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class RockPaperScissorsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rps',
			group: 'fun',
			memberName: 'rps',
			description: 'A nice game of rock paper scissors!',
		});
	}

	run(message, args) {
        var chance = Math.floor(Math.random() * 3);
        if (chance == 0){
            message.reply("I got rock! :rock:");
        }
        if (chance == 1){
            message.reply("I got paper! :newspaper:");
        }
        if (chance == 2){
            message.reply("I got scissors! :scissors:");
        }
	}
};