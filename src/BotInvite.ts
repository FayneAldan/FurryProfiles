import { Client } from "discord.js-commando";
import { PermissionResolvable } from "discord.js";

const perms: Array<PermissionResolvable> =
	['VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'MANAGE_ROLES', 'ADD_REACTIONS'];
let invite: string;

export async function generateInvite(client: Client, perms: PermissionResolvable[]) {
	try {
		invite = await client.generateInvite(perms);
	} catch (err) {
		invite = null;
		console.warn('Failed to generate invite link.');
		console.warn(err);
	}
	return invite;
}

export default function(): string {
	return invite;
}
