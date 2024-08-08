import { Routes, REST } from "discord.js";
import { APPLICATION_ID, TOKEN, APPLICATION_COMMANDS } from "./config.js";

const registerCommands = async () => {
	const rest = new REST().setToken(TOKEN);
	try {
		console.log("Registering application commands...");
		const data = await rest.put(
			Routes.applicationCommands(APPLICATION_ID),
			{ body: Object.keys(APPLICATION_COMMANDS).map(k => APPLICATION_COMMANDS[k].data.toJSON()) },
		)
		console.log("\x1b[32mSuccessfully registered application commands.\x1b[0m");
	} catch (err) {
		console.error(err);
	}
}

await registerCommands();