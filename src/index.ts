import { PermissionResolvable } from 'discord.js';
import { CommandoClient, util } from 'discord.js-commando';
import token from './token';
import handleDM from './handle/cmdDM';
import handleGuild from './handle/cmdGuild';
import FileProvider from './FileProvider';

const client = new CommandoClient({
	owner: '157917665162297344'
});
let inviteLink = "Not yet generated";

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	const perms: Array<PermissionResolvable> =
		['VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'MANAGE_ROLES', 'ADD_REACTIONS'];
	client.generateInvite(perms).then(link => {
		inviteLink = link;
		console.log('Invite link: ' + link);
	}).catch(e => {
		inviteLink = 'Failed to generate';
		console.warn('Failed to generate invite link!');
		console.warn(e);
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
