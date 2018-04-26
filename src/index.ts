import { PermissionResolvable } from 'discord.js';
import { Client, util } from 'discord.js-commando';
import token from './token';
import handleDM from './handle/cmdDM';
import handleGuild from './handle/cmdGuild';
import FileProvider from './FileProvider';
import { generateInvite } from './BotInvite';

const client = new Client({
	owner: '157917665162297344',
	unknownCommandResponse: false,
	invite: 'https://discord.gg/QRzvckF'
});

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	const perms: Array<PermissionResolvable> =
		['VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'MANAGE_ROLES', 'ADD_REACTIONS'];
	generateInvite(client, perms).then(invite => {
		console.log('Invite link: ' + invite);
	});
});

client.setProvider(new FileProvider('settings', true)).catch(console.error);

client.on('message', msg => {
	if (msg.author.bot) return;
	const type = msg.channel.type;
	if (type == 'dm')
		handleDM(msg, client);
	else if (type == 'text')
		handleGuild(msg, client);
});

client.login(token);
