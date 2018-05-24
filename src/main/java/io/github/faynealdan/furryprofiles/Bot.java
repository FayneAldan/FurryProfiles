package io.github.faynealdan.furryprofiles;

import java.util.concurrent.ConcurrentMap;
import org.mapdb.DBMaker;
import org.mapdb.DB;
import io.jsondb.JsonDBTemplate;
import com.jagrosh.jdautilities.examples.command.PingCommand;
import com.jagrosh.jdautilities.examples.command.GuildlistCommand;
import net.dv8tion.jda.core.entities.Game;
import net.dv8tion.jda.core.OnlineStatus;
import java.awt.Color;
import com.jagrosh.jdautilities.examples.command.AboutCommand;
import com.jagrosh.jdautilities.command.Command;
import com.jagrosh.jdautilities.commons.waiter.EventWaiter;
import net.dv8tion.jda.core.Permission;
import java.util.Scanner;
import com.jagrosh.jdautilities.command.CommandClient;
import com.jagrosh.jdautilities.command.CommandClientBuilder;
import net.dv8tion.jda.bot.sharding.DefaultShardManagerBuilder;
import net.dv8tion.jda.core.hooks.ListenerAdapter;

public class Bot extends ListenerAdapter {
	private final static String dbFilesLoc =
		System.getProperty("user.home") + System.getProperty("file.separator") + ".furryfriends";
	public final static JsonDBTemplate jsonDBTemplate =
		new JsonDBTemplate(dbFilesLoc, "io.github.faynealdan.furryprofiles.models");
	private final static Permission[] invitePerms = {
		Permission.MESSAGE_READ, Permission.MESSAGE_WRITE,
		Permission.MESSAGE_MANAGE, Permission.MESSAGE_EMBED_LINKS,
		Permission.MANAGE_ROLES, Permission.MESSAGE_ADD_REACTION
	};
	public final static DB db =
		DBMaker.fileDB("file.db").closeOnJvmShutdown().make();

	public static void main(String[] args) throws Exception {
		EventWaiter waiter = new EventWaiter();
		Command about = new AboutCommand(Color.BLUE, "an example bot",
			new String[] {"Keeps track of users' profiles."}, invitePerms);
		Scanner input = new Scanner(ClassLoader.getSystemResourceAsStream("token.txt"));
		CommandClient client = new CommandClientBuilder()
			.setOwnerId("157917665162297344")
			.setPrefix("fp.")
			.setAlternativePrefix("@mention")
			.setServerInvite("https://discord.gg/QRzvckF")
			.useDefaultGame()
			.addCommands(about, new GuildlistCommand(waiter), new PingCommand())
			.addCommands(new ViewCommand())
			.build();
		new DefaultShardManagerBuilder().setToken(input.nextLine())
			.addEventListeners(new Bot(), waiter, client)
			.setStatus(OnlineStatus.DO_NOT_DISTURB)
			.setGame(Game.playing("loading..."))
			.build();
		input.close();
	}
}
