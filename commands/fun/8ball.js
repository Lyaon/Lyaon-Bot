const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class MagicBallCommand extends Command {
	constructor(client) {
		super(client, {
			name: '8ball',
			group: 'fun',
			memberName: '8ball',
			description: 'A magic 8 ball!',
		});
	}

	run(message, args) {
        let words = args.split(' ');
        let reason = words.slice(0).join(' ');
        if (!reason){
            message.reply('Incomplete command! EX: -8ball Is this command cool?');
            return;
        }
        
        var chance = Math.floor(Math.random() * 20);
        if (chance == 0){
            message.reply("● It is certain.");
        }
        if (chance == 1){
            message.reply("● It is decidedly so.");
        }
        if (chance == 2){
            message.reply("● Without a doubt.");
        }
        if (chance == 3){
            message.reply("● Yes - definitely.");
        }
        if (chance == 4){
            message.reply("● You may rely on it.");
        }
        if (chance == 5){
            message.reply("● As I see it, yes.");
        }
        if (chance == 6){
            message.reply("● Most likely.");
        }
        if (chance == 7){
            message.reply("● Outlook good.");
        }
        if (chance == 8){
            message.reply("● Yes.");
        }
        if (chance == 9){
            message.reply("● Signs point to yes.");
        }
        if (chance == 10){
            message.reply("● Reply hazy, try again.");
        }
        if (chance == 11){
            message.reply("● Ask again later.");
        }
        if (chance == 12){
            message.reply("● Better not tell you now.");
        }
        if (chance == 13){
            message.reply("● Cannot predict now.");
        }
        if (chance == 14){
            message.reply("● Concentrate and ask again.");
        }
        if (chance == 15){
            message.reply("● Don't count on it.");
        }
        if (chance == 16){
            message.reply("● My reply is no.");
        }
        if (chance == 17){
            message.reply("● My sources say no.");
        }
        if (chance == 18){
            message.reply("● Outlook not so good.");
        }
        if (chance == 19){
            message.reply("● Very doubtful.");
        }
	}
};