const { PermissionResolvable } = require('discord.js');
const { Client } = require('klasa');
const token = require('./token');
const path = require('path');

const client = new Client({
	ownerID: '157917665162297344',
	prefix: 'fp.'
	//invite: 'https://discord.gg/QRzvckF'
});

client.on('ready', () => {
	const perms = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'MANAGE_ROLES', 'ADD_REACTIONS'];
});

client.login(token);
