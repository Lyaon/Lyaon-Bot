const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class TopicCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'topic',
			group: 'fun',
			memberName: 'topic',
			description: 'A fun ice breaker for a silent chat!',
		});
	}

	run(message, args) {
        var chance = Math.floor(Math.random() * 11);
        if (chance == 0){
            message.reply("What was your school like?");
        }
        if (chance == 1){
            message.reply("If you had the chance, would you go to mars? Why, or why not?");
        }
        if (chance == 2){
            message.reply("If you could choose any car, what car would you get?");
        }
        if (chance == 3){
            message.reply("What breed of dogs do you like?");
        }
        if (chance == 4){
            message.reply("How is your base going on the server?");
        }
        if (chance == 5){
            message.reply("Are you interested in history? If so, tell us why.");
        }
        if (chance == 6){
            message.reply("Are you interested in science? If so, tell us why.");
        }
        if (chance == 7){
            message.reply("What do you think the future will look like?");
        }
        if (chance == 8){
            message.reply("What was your near death experience?");
        }
        if (chance == 9){
            message.reply("Are you a redstone person or a builder?");
        }
        if (chance == 10){
            message.reply("What is a book that you think everyone should read atleast once?");
        }
	}
};