import { Message, DMChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

export default function handleDM(msg: Message, client: CommandoClient) {
	const channel = msg.channel as DMChannel;
	msg.reply('Not yet implemented.');
}
