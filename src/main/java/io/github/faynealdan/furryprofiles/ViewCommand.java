package io.github.faynealdan.furryprofiles;

import io.github.faynealdan.furryprofiles.models.UserProfile;
import java.awt.Color;
import net.dv8tion.jda.core.entities.User;
import java.util.List;
import com.jagrosh.jdautilities.commons.utils.FinderUtil;
import net.dv8tion.jda.core.EmbedBuilder;
import com.jagrosh.jdautilities.command.CommandEvent;
import com.jagrosh.jdautilities.command.Command;

public class ViewCommand extends Command {
	public ViewCommand() {
		this.name = "view";
		this.aliases = new String[] {"profile"};
		this.help = "shows someone's profile";
		this.arguments = "[user]";
		this.guildOnly = false;
	}

	protected void execute(CommandEvent event) {
		String args = event.getArgs();
		User user;
		if (args.isEmpty())
			user = event.getAuthor();
		else {
			List<User> users = FinderUtil.findUsers(args, event.getJDA());
			if (users.size() == 0) {
				event.replyError("User not found.");
				return;
			} else if (users.size() > 1) {
				event.replyError("Multiple users found.");
				return;
			}
			user = users.get(0);
		}
		EmbedBuilder embed = new EmbedBuilder();
		String alt = String.format("%#s's Profile", user);
		embed.setAuthor(alt, null, user.getEffectiveAvatarUrl());
		alt = "**__" + alt + "__**";
		UserProfile profile = UserProfile.getProfile(user);
		boolean hasProfile = false;
		String species = profile.getSpecies();
		if (species != null) {
			embed.addField("Species", species, true);
			alt += "\n**Species:** " + species;
			hasProfile = true;
		}
		String gender = profile.getGender();
		if (gender != null) {
			embed.addField("Gender", gender, true);
			alt += "\n**Gender:** " + gender;
			hasProfile = true;
		}
		String sexuality = profile.getSexuality();
		if (sexuality != null) {
			embed.addField("Sexuality", sexuality, true);
			alt += "\n**Sexuality:** " + sexuality;
			hasProfile = true;
		}
		if (!hasProfile) {
			embed.setDescription("Profile not found.");
			alt += "\nProfile not found.";
		}
		event.replyOrAlternate(embed.build(), alt);
	}
}
