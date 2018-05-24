package io.github.faynealdan.furryprofiles.models;

import net.dv8tion.jda.core.entities.MessageEmbed.Field;
import net.dv8tion.jda.core.entities.MessageEmbed;
import net.dv8tion.jda.core.entities.Message;
import net.dv8tion.jda.core.entities.PrivateChannel;
import net.dv8tion.jda.core.entities.User;

public class UserProfile {
	private String species;
	private String gender;
	private String sexuality;

	private UserProfile() {}

	public static UserProfile getProfile(User user) {
		if (user.isBot())
			return getBotProfile();
		MessageEmbed embed;
		try {
			PrivateChannel dmChannel = user.openPrivateChannel().complete();
			Message msg = dmChannel.getPinnedMessages().complete().get(0);
			if (msg.getAuthor().getId() != user.getJDA().getSelfUser().getId())
				return null;
			embed = msg.getEmbeds().get(0);
		} catch (Exception e) {
			return null;
		}
		UserProfile profile = new UserProfile();
		for (Field field : embed.getFields()) {
			switch (field.getName()) {
				case "Species":
					profile.setSpecies(field.getValue());
					break;
				case "Gender":
					profile.setGender(field.getValue());
					break;
				case "Sexuality":
					profile.setSexuality(field.getValue());
					break;
			}
		}
		return profile;
	}

	private static UserProfile getBotProfile() {
		UserProfile profile = new UserProfile();
		profile.setSpecies("Bot");
		profile.setGender("Ambiguous");
		profile.setSexuality("Botsexual");
		return profile;
	}

	public String getSpecies() {
		return this.species;
	}
	public void setSpecies(String species) {
		this.species = species;
	}

	public String getGender() {
		return this.gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getSexuality() {
		return this.sexuality;
	}
	public void setSexuality(String sexuality) {
		this.sexuality = sexuality;
	}
}
