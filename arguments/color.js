const { Argument, Client } = require('klasa');
const { resolveColor } = require('discord.js');

module.exports = class extends Argument {
	run(arg, possible, msg) {
		return resolveColor(arg);
	}
}
