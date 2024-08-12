import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class Database {
	constructor(filename) {
		this.filename = filename;
		this.dbConnection = new sqlite3.Database(`${__dirname}/${filename}`);
		this.run = this.dbConnection.run;
		this.exec = this.dbConnection.exec;
	}

	// createTable
	// 	Creates table in Database of given name and cols if it doesn't exist already
	// Params:
	// 	name - name of table
	// 	cols - comma separated columns as they would be provided to SQL (e.g. id INTEGER PRIMARY KEY, name TEXT)
	// 	callback - callback if create table succeeds
	createTable(name, cols, callback) {
		this.dbConnection.run(`CREATE TABLE IF NOT EXISTS ${name} (${cols})`, res => {
			if (res instanceof Error) {
				console.log(`\x1b[31mError creating table '${name}':\x1b[0m\n${res}`)
			} else if (callback) {
				callback();
			}
		});
	}
}