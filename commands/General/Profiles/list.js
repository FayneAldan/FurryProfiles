const { Command } = require('klasa');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: 'Shows a list of choosable information for profiles.',
			subcommands: true,
			usage: '<species|genders|sexualities>'
		});
	}

	async species(msg) {
		const list = this.client.configs.speciesList;
		return msg.sendMessage('**Species:** ' + this.format(list));
	}

	async genders(msg) {
		const list = this.client.configs.genderList;
		return msg.sendMessage('**Genders:** ' + this.format(list));
	}

	async sexualities(msg) {
		const list = this.client.configs.sexualityList;
		return msg.sendMessage('**Sexualities:** ' + this.format(list));
	}

	format(list) {
		if (list.length == 0) return 'None';
		return list.sort().map(item => '`'+item+'`').join(' / ');
	}
}
