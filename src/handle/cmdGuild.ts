import { Message, MessageMentions, GuildChannel, User } from 'discord.js';
import createProfile from './createProfile';
import { Client } from 'discord.js-commando';
const { USERS_PATTERN } = MessageMentions;

export default function handleGuild(msg: Message, client: Client) {
	// Only respond if bot is mentioned
	if (!msg.mentions.users.has(client.user.id)) return;
	// Message must only contain mentions
	// Necessary so info on bot usage can be sent without activating the bot.
	const trim = msg.content.replace(USERS_PATTERN, '').trim();
	if (trim.length > 0) return;
	const channel = msg.channel as GuildChannel;
	let mentions = msg.mentions.users;
	mentions.delete(client.user.id);
	const size = mentions.size;
	if (size == 1)
		showProfile(msg, mentions.first(), client);
	else if (size == 0)
		createProfile(msg.author, client);
}

async function showProfile(msg: Message, user: User, client: Client) {
	await msg.reply("Not yet implemented.");
}
