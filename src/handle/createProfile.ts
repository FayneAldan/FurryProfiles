import { User, MessageEmbed, version as discordJSVersion, Message, MessageReaction } from 'discord.js';
import { CommandoClient, version as commandoVersion } from 'discord.js-commando';

const enum Reacts {
	Edit = "✏",
	Delete = "❌",
	About = "ℹ"
}
const ReactList: string[] = [
	Reacts.Edit, Reacts.Delete, Reacts.About
];

export default async function(user: User, client: CommandoClient) {
	let prompt = getPrompt(client);
	let about = getAbout(client);

	const dmChannel = await user.createDM();
	const promptMsg = await dmChannel.send(prompt) as Message;
	for (const react of ReactList)
		await promptMsg.react(react);
	const react = await promptMsg.awaitReactions((reaction: MessageReaction) =>
		ReactList.indexOf(reaction.emoji.toString()) >= 0,
	{max: 1});
	switch (react.first().emoji.toString()) {
		case Reacts.Edit:
		case Reacts.Delete:
			dmChannel.send('Not yet implemented.');
			break;
		case Reacts.About:
			dmChannel.send(getAbout(client));
	}
}

function getPrompt(client: CommandoClient) {
	let ret = new MessageEmbed();
	ret.setTitle("Furry Profiles");
	ret.setDescription("Would you like to edit your profile?");
	ret.addField("Edit Profile", "React " + Reacts.Edit, true);
	ret.addField("Delete Profile", "React " + Reacts.Delete, true);
	ret.addField("About Bot", "React " + Reacts.About, true);
	return ret;
}

function getAbout(client: CommandoClient) {
	let ret = new MessageEmbed();
	const owner: User = client.owners[0];
	if (owner)
		ret.setFooter("Developed by " + owner.tag, owner.displayAvatarURL());
	ret.setTitle("Furry Profiles");
	ret.addField('[Node.js](https://nodejs.org)', process.version);
	ret.addField('[Discord.js](https://discord.js.org)', discordJSVersion);
	ret.addField('[Commando](https://discord.js.org/#/docs/commando)', commandoVersion);
	
}
