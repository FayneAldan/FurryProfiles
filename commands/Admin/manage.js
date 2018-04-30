const { Command } = require('klasa');
const _ = require('lodash');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: "Manage lists",
			usage: '<list:list> <item:string> [...]',
			permLevel: 9,
			guarded: true,
			usageDelim: ' '
		});

		this.createCustomResolver('list', (arg, possible, msg) => {
			switch (arg) {
				case 'species': return 'speciesList';
				case 'genders': case 'gender': return 'genderList';
				case 'sexualities': case 'sexuality': return 'sexualityList';
				default:
					throw msg.language.get('COMMANDMESSAGE_NOMATCH', 'species, genders, sexualities');
			}
		});
	}

	async run(msg, [listName, ...items]) {
		const added = [];
		const removed = [];
		items = _.uniqBy(items, _.toLower);
		let list = this.client.configs.get(listName);
		let lcList = _.map(list, _.toLowerCase);
		for (let item of items) {
			const index = _.indexOf(lcList, _.toLowerCase(item));
			if (index >= 0) item = list[index];
			await this.client.configs.update(listName, item, msg.guild);
			if (index < 0) added.push(item);
			else removed.push(item);
		}
		const out = [];
		out.push(`**__${ _.startCase(listName) }__**`);
		out.push('**Added:** ' +
		  (  added.map(item => '`'+item+'`').join(' / ') || '*None*'));
		out.push('**Removed**: ' +
			(removed.map(item => '`'+item+'`').join(' / ') || '*None*'));
		return msg.sendMessage(out.join('\n'));
	}
}
