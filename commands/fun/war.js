const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class WarCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'war',
			group: 'fun',
			memberName: 'war',
			description: `An original command from the early days of the server!`,
		});
	}

	run(message, args) {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        const Warinfo = new discord.MessageEmbed()
            .setTimestamp()
            .setColor('#ffa500')
            .setTitle('Minecraft WAR!')
            .setFooter('Who will win? Will it be you or, will it be your enemy?')
            .addField('Members: ', "9")
            .addField('War Members:', message.guild.roles.cache.get('721920054660431912').members.map(m=>m.user.tag).join('\n')+",are in the war!")
            .addField('Red Team Members: ', message.guild.roles.cache.get('721920044019482675').members.map(m=>m.user.tag).join('\n')+",are in the RedTeam!")
            .addField('Blue Team Members:', message.guild.roles.cache.get('721920050361139260').members.map(m=>m.user.tag).join('\n')+",are in the BlueTeam!")
        message.channel.send(Warinfo);
	}
};