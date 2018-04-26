import { User, Guild } from 'discord.js';
import { Client, SettingProvider } from 'discord.js-commando';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

export default class FileProvider extends SettingProvider {
	private settings = new Map<string, { [index: string]: any }>();
	private client: Client;

	constructor(private baseDir = 'settings', private pretty = false) {
		super();
	}
	async init(client: Client) {
		this.client = client;
		try {
			await promisify(fs.mkdir)(this.baseDir);
		} catch (err) {
			if (err.code !== 'EEXIST')
				throw err;
		}
		const files = await promisify(fs.readdir)(this.baseDir);
		for (const file of files) {
			if (path.extname(file) !== '.json')
				continue;
			const guild = path.basename(file, '.json');
			const dir = path.join(this.baseDir, file);
			const data = await promisify(fs.readFile)(dir, 'utf8');
			const settings = JSON.parse(data);
			this.settings.set(guild, settings);
		};
	}

	async destroy() {}

	get(guildP: Guild | string, key: string, defVal?: any): any {
		const guild = SettingProvider.getGuildID(guildP);
		const settings = this.settings.get(guild);
		if (settings && settings[key] !== undefined)
			return settings[key];
		else return defVal;
	}

	async set(guildP: Guild | string, key: string, val: any): Promise<any> {
		const guild = SettingProvider.getGuildID(guildP);
		let settings = this.settings.get(guild);
		if (!settings) {
			settings = {};
			this.settings.set(guild, settings);
		}
		settings[key] = val;
		this.save(guild, settings);
		return val;
	}

	async remove(guildP: Guild | string, key: string) {
		const guild = SettingProvider.getGuildID(guildP);
		const settings = this.settings.get(guild);
		if (!settings || settings[key] === undefined)
			return undefined;
		const val = settings[key];
		settings[key] = undefined;
		this.save(guild, settings);
		return val;
	}

	async clear(guildP: Guild | string) {
		const guild = SettingProvider.getGuildID(guildP);
		if (!this.settings.has(guild)) return;
		this.settings.delete(guild);
		const dir = path.join(this.baseDir, guild + '.json');
		await promisify(fs.unlink)(dir);
	}

	private async save(guild: string, settings = this.settings.get(guild)) {
		const dir = path.join(this.baseDir, guild + '.json');
		const data = JSON.stringify(settings, null, this.pretty ? '\t' : null);
		await promisify(fs.writeFile)(dir, data);
	}
}
