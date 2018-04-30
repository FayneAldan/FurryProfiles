const { Argument, Client } = require('klasa');

module.exports = class extends Argument {
	async init() {
		this.listUsage = this.client.commands.get('list').usage;
	}

	run(arg, possible, msg) {
		const list = this.client.configs.sexualityList;
		const lc = arg.toLowerCase();
		for (const item of list)
			if (lc == item.toLowerCase())
				return arg;
		throw 'Not a valid sexuality. For a list of valid sexualities: ' +
			this.listUsage.fullUsage(msg);
	}
}
