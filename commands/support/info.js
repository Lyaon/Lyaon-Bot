const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'info',
			group: 'support',
			memberName: 'info',
			description: `Gives you the latest information about the Discord, Minecraft, and the Discord bot!`,
		});
	}

	run(message, args) {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        const InfoMessage = new discord.MessageEmbed()
            .setColor("0x20B2AA")
            .setTimestamp()
            .setThumbnail(message.guild.iconURL())
            .setTitle(`${message.guild.name}`)
            .addField("Server Info:", `
                :satellite: **Minecraft IP:** Hermitcraft.pedestriamc.com
                :satellite: **Minecraft Bedrock IP:** Bedrock.hermitcraft.pedestriamc.com | Port: 19133
                :e_mail: **Discord Invite:** https://discord.gg/AURDPCN
                :person_in_tuxedo: **Members:** ${message.guild.memberCount}
            `)
            .addField("Bot Info:", `
                :technologist: **Developer:** theopcoder
                :shield: **Version:** ${Version}
                :desktop: **GitHub repository:** https://github.com/theopcoder/HermitcraftBot
            `)
            .setFooter(`Build ID: ${BuildID}`)
        message.channel.send(InfoMessage);
	}
};