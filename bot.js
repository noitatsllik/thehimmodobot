const Discord = require("discord.js"); // We Call The Packages.
// const PREFIX = "<"; // You can change this Prefix to whatever you want.
const PREFIX = process.env.PREFIX;

var bot = new Discord.Client();

// Events.
bot.on("ready", function() {
    bot.user.setGame(`sex game`);
    console.log(`${bot.user.username} is Ready!`);
});

bot.on("message", function(message) {

    if (message.author.bot) return;

    if (!message.guild) return;

    if (!message.content.startsWith(PREFIX)) return;
    
    var args = message.content.substring(PREFIX.length).split(" ");
    var command = args[0].toLowerCase();

// Commands.
    if (command == "help") {
        var embedhelpmember = new Discord.RichEmbed()
            .setAuthor("💬 Command List.")
            .addField(" - avatar", "Show your Avatar, nigga")
            .addField(" - sexo", "activates sexo modo, nigga")
            .setColor(0x00FFEE)
            .setFooter("black people", bot.user.displayAvatarURL);
        var embedhelpadmin = new Discord.RichEmbed()
            .setAuthor("💬 Moderator Commands.")
            .addField(" - prune", "delete shit , up to 99 messages")
            .addField(" - kick", "This really just kicks a nigga.")
            .setColor(0x00FFEE)
            .setFooter("black people", bot.user.displayAvatarURL);
            message.channel.send(embedhelpmember)
        if(message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(embedhelpadmin);
    };

    if (command == "avatar") {
        let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        message.channel.send({
               embed: {
                  title: `${member.displayAvatarURL}'s Profile Picture.`,
                  image: {
                      url: member.AvatarURL
                  },
                  color: 0x00FFEE
               }
        })
    };

    if (command == "sexo") {
        message.channel.send("**:sunglasses: ON!:thumbsup:** https://i.imgur.com/6mv5pTU.png");
    };

    if(command === "prune") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("**🔒 Sorry nigga you can't do that.**");
        var messagesToDelete = args[1];
        if (!args[1]) return message.channel.send("❌ nigga how many to **Prune**!");
        if (args[1] > 99) return message.channel.send("❌ I can't **Prune** more than `99` Messages you fucking faggot.");
        message.channel.fetchMessages({limit: messagesToDelete})
        .then(messages => message.channel.bulkDelete(messages.size + 1))
        .catch(error => message.channel.send(`❌ Sorry ${message.author}, Failed while **Prunning** because: *${error}*. bitch ass`));
    };

    if(command == "kick") {
        message.delete()
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("❌ nigga kick who????");
        let kReason = args.join(" ").slice(0);
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("**🔒 I can't do it he got too much clout.**");
        if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("❌ Failed to **Kick**, need more clout.");
    
        let kickEmbed = new Discord.RichEmbed()
        .setDescription("**👢 Kicked**")
        .setColor(0xFF0000)
        .addField("User", `${kUser}`)
        .addField("Moderator", `<@${message.author.id}>`)
        .addField("Reason", `**\`\`\`${kReason}\`\`\`**`);
    
        let adminlog = message.guild.channels.find(`name`, "mod-logs");
        if(!adminlog) return message.channel.send("❌ Sorry, i need the Logging Channels with name **#mod-logs** you fucking retard.");
        message.guild.member(kUser).kick(kReason);
        adminlog.send(kickEmbed);
    };

});

// Bot Login.
// bot.login('YourAwesomeBotToken');
bot.login(process.env.BOT_TOKEN);
