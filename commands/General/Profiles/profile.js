const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const _ = require('lodash');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			name: 'profile',
			aliases: ['view'],
			runIn: ['text'],
			description: "View someone's profile.",
			usage: '[user:user]',
			usageDelim: ' '
		});
	}

	run(msg, [user]) {
		if (!user) user = msg.author;
		const { color, species, gender, sexuality } = user.configs;
		let embed = new MessageEmbed();
		embed.setAuthor(user.tag + "'s Profile", user.displayAvatarURL());
		if (user.bot) {
			embed.addField('Species', 'Bot', true);
			embed.addField('Gender', 'Ambiguous', true);
			embed.addField('Sexuality', 'Botsexual', true);
			return msg.send(embed);
		}
		let found = false;
		if (color) embed.setColor(color);
		const speciesClean = _.reject(species, i =>
			_.isError(_.attempt(this.client.arguments.get('species').run(i))));
		if (speciesClean.length) {
				found = true;
				embed.addField('Species', speciesClean.join(' '), true);
		}
		if (gender && !_.isError(_.attempt(this.client.arguments.get('gender').run(gender)))) {
				found = true;
				embed.addField('Gender', gender. true);
		}
		if (sexuality && !_.isError(_.attempt(this.client.arguments.get('sexuality').run(sexuality)))) {
				found = true;
				embed.addField('Sexuality', sexuality, true);
		}
		if (!found)
			embed.setDescription("Profile not found.");
		return msg.send(embed);
	}


}
