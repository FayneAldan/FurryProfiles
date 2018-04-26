import { Message, DMChannel } from 'discord.js';
import { Client } from 'discord.js-commando';
import createProfile from './createProfile';

export default function handleDM(msg: Message, client: Client) {
	const channel = msg.channel as DMChannel;
	createProfile(msg.author, client);
}
