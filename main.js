const Discord = require('discord.js');
const readline = require('readline-promise').default;
const client = new Discord.Client();
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: true
});

const TOKEN = ''; // Put your token here if you don't wanna be prompted all the time

const STATUSES = ['playing', 'streaming', 'listening to', 'watching'];
const DEFAULT_STATUS = 0;

client.on('ready', async () => {
	console.log('Available prefixes: ' + STATUSES.join(', '));
	while (true) {
		let presence = await rl.questionAsync('Enter your new status and press enter\n');
		let type = STATUSES.findIndex(status => presence.startsWith(status));
		let defaulted;
		if (type == -1) {
			console.log('No prefix found; defaulting to ' + STATUSES[DEFAULT_STATUS].toUpperCase());
			defaulted = true;
			type = DEFAULT_STATUS;
		}
		const string_type = STATUSES[type].toUpperCase();
		if (!defaulted) {
			presence = presence.slice(string_type.length).trim();
		}
		console.log('Status set!\n' + string_type + ' ' + presence);
		client.user.setPresence({
			game: {
				name: presence || ' ',
				type: type
			}
		});
	}
});

(async () => client.login(TOKEN || await rl.questionAsync('Input discord token\n')))();