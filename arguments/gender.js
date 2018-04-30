const { Argument, Client } = require('klasa');

module.exports = class extends Argument {
	async init() {
		this.listUsage = this.client.commands.get('list').usage;
	}

	run(arg, possible, msg) {
		const list = this.client.configs.genderList;
		const lc = arg.toLowerCase();
		for (const item of list)
			if (lc == item.toLowerCase())
				return arg;
		throw 'Not a valid gender. For a list of valid genders: ' +
			this.listUsage.fullUsage(msg);
	}
}
