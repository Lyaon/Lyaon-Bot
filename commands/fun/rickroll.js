const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class RickrollCommand extends Command {
constructor(client) {
  super(client, {
    name: 'rickroll',
    group: 'fun',
    memberName: 'rickroll',
    description: 'Rickrolls you!',
  });
}

run(message, args) {
let words = args.split(' ');
let reason = words.slice(0).join(' ');
if (reason == "help"){
    const RickrollHelp = new discord.MessageEmbed()
        .setTimestamp()
        .setColor("RANDOM")
        .setTitle("Rickroll Help")
        .setDescription(`
            **Usage:**
                a. Command usage: -rickroll <stanzas|verses|link>
                \taa. Stanza: Word Wrapped (One Line)
                \tab. Verse: Multiple Lines
                \tac. Link: The Official VEVO link

        `)
    message.channel.send(RickrollHelp);
  } else if (reason == ""){
      const RickrollHelp = new discord.MessageEmbed()
          .setTimestamp()
          .setColor("RANDOM")
          .setTitle("Rickroll Help")
          .setDescription(`
              **Usage:**
                  a. Command usage: -rickroll <stanzas|verses|link>
                  \taa. Stanza: Word Wrapped (One Line)
                  \tab. Verse: Multiple Lines
                  \tac. Link: The Official VEVO link

        `)
    message.channel.send(RickrollHelp);
} else if (reason == "stanzas"){
    const RickrollStanza = new discord.MessageEmbed()
        .setTimestamp()
        .setColor("RANDOM")
        .setTitle("Never Gonna Give You Up - Rick Astley")
        .setDescription(`
            We're no strangers to love/ You know the rules and so do I/ A full commitment's what I'm thinking of/ You wouldn't get this from any other guy/ I just wanna tell you how I'm feeling/ Gotta make you understand/ Never gonna give you up/ Never gonna let you down/ Never gonna run around and desert you/ Never gonna make you cry/ Never gonna say goodbye/ Never gonna tell a lie and hurt you/ We've known each other for so long/ Your heart's been aching, but/ You're too shy to say it/ Inside, we both know what's been going on/ We know the game and we're gonna play it/ And if you ask me how I'm feeling/ Don't tell me you're too blind to see/ Never gonna give you up/ Never gonna let you down/ Never gonna run around and desert you/ Never gonna make you cry/ Never gonna say goodbye/ Never gonna tell a lie and hurt you/ Never gonna give you up/ Never gonna let you down/ Never gonna run around and desert you/ Never gonna make you cry/ Never gonna say goodbye/ Never gonna tell a lie and hurt you/ (Ooh, give you up)/ (Ooh, give you up)/ Never gonna give, never gonna give/ (Give you up)/ Never gonna give, never gonna give/ (Give you up)/ We've known each other for so long/ Your heart's been aching, but/ You're too shy to say it/ Inside, we both know what's been going on/ We know the game and we're gonna play it/ I just wanna tell you how I'm feeling/ Gotta make you understand/ Never gonna give you up/ Never gonna let you down/ Never gonna run around and desert you/ Never gonna make you cry/ Never gonna say goodbye/ Never gonna tell a lie and hurt you/ Never gonna give you up/ Never gonna let you down/ Never gonna run around and desert you/ Never gonna make you cry/ Never gonna say goodbye/ Never gonna tell a lie and hurt you/ Never gonna give you up/ Never gonna let you down/ Never gonna run around and desert you/ Never gonna make you cry/ Never gonna say goodbye/ Never gonna tell a lie and hurt you
        `)
    message.channel.send(RickrollStanza);
  } else if (reason == "verses"){
      const RickrollVerses = new discord.MessageEmbed()
          .setTimestamp()
          .setColor("RANDOM")
          .setTitle("Never Gonna Give You Up - Rick Astley")
          .setDescription(`
              We're no strangers to love\nYou know the rules and so do I\nA full commitment's what I'm thinking of\nYou wouldn't get this from any other guy\nI just wanna tell you how I'm feeling\nGotta make you understand\n\nNever gonna give you up\nNever gonna let you down\n Never gonna run around and desert you\n\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\n\n We've known each other for so long\nYour heart's been aching, but\nYou're too shy to say it\n\nInside, we both know what's been going on\nWe know the game and we're gonna play it\nAnd if you ask me how I'm feeling\nDon't tell me you're too blind to see\n\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\n\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\n\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nnNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\n\n(Ooh, give you up)\n(Ooh, give you up)\n\nNever gonna give, never gonna give\n(Give you up)\nNever gonna give, never gonna give\n(Give you up)\n\n We've known each other for so long\nYour heart's been aching, but\nYou're too shy to say it\n\nInside, we both know what's been going on\nWe know the game and we're gonna play it\n\nI just wanna tell you how I'm feeling\nGotta make you understand\n\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\n\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\n\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\n\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\n\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\n\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you
          `)
      message.channel.send(RickrollVerses);
    } else if (reason == "link"){
        const RickrollLink = new discord.MessageEmbed()
            .setTimestamp()
            .setColor("RANDOM")
            .setTitle("Never Gonna Give You Up - Rick Astley")
            .setDescription(`
                https://www.youtube.com/watch?v=dQw4w9WgXcQ
            `)
        message.channel.send(RickrollLink);
      }
    }
}