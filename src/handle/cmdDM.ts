import { Message, DMChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';
import createProfile from './createProfile';

export default function handleDM(msg: Message, client: CommandoClient) {
	const channel = msg.channel as DMChannel;
	createProfile(msg.author, client);
}
