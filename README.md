# eco-bot
Discord economy bot

## How to add more commands
Under ```src/commands```, create a new JavaScript file for each command you want to add, naming it whatever you'd like (you can also add subfolders).

In order to be registered as a command, each file must have:

- data: ```SlashCommandBuilder``` that holds info such as name, description, etc.
- type: Type of command
	<details><summary>Supported command types</summary>
	- APP_CMD: application command
	</details>
- exec: Function that executes your command given an InteractionObject