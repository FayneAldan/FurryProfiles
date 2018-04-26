import { User, MessageEmbed, Message, MessageReaction } from 'discord.js';
import { Client } from 'discord.js-commando';

import { version as discordJSVersion } from 'discord.js';
import { version as commandoVersion } from 'discord.js-commando';

const enum Reacts {
	Edit = "✏",
	Delete = "❌",
	About = "ℹ"
}
const ReactList: string[] = [
	Reacts.Edit, Reacts.Delete, Reacts.About
];

export default async function(user: User, client: Client) {
	let prompt = getPrompt(client);
	let about = getAbout(client);

	const dmChannel = await user.createDM();
	const promptMsg = await dmChannel.send(prompt) as Message;
	for (const react of ReactList)
		await promptMsg.react(react);
	const react = await promptMsg.awaitReactions((reaction: MessageReaction, reactor: User) =>
		ReactList.indexOf(reaction.emoji.toString()) >= 0 && reactor.id == user.id,
	{max: 1});
	console.log(react.first().emoji.toString());
	switch (react.first().emoji.toString()) {
		case Reacts.Edit:
		case Reacts.Delete:
			dmChannel.send('Not yet implemented.');
			break;
		case Reacts.About:
			dmChannel.send(getAbout(client));
	}
}

function getPrompt(client: Client) {
	let ret = new MessageEmbed();
	ret.setTitle("Furry Profiles");
	ret.setDescription("Would you like to edit your profile?");
	ret.addField("Edit Profile", "React " + Reacts.Edit, true);
	ret.addField("Delete Profile", "React " + Reacts.Delete, true);
	ret.addField("About Bot", "React " + Reacts.About, true);
	return ret;
}

function getAbout(client: Client) {
	let ret = new MessageEmbed();
	const owner: User = client.owners[0];
	if (owner)
		ret.setFooter("Developed by " + owner.tag, owner.displayAvatarURL());
	ret.setTitle("Furry Profiles");
	ret.addField('Node.js', process.version, true);
	ret.addField('Discord.js', discordJSVersion, true);
	ret.addField('Commando', commandoVersion, true);
	return ret;
}
