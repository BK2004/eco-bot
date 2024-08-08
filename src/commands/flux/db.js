import { Database } from "../../db/db.js";

export const type = 'DB_INIT';
export const fluxDB = new Database("flux.db");
export const init = () => {
	fluxDB.createTable("server", `
		serverid INTEGER PRIMARY KEY
	`);
	fluxDB.createTable("user", `
		userid INTEGER PRIMARY KEY,
		server INTEGER,
		flux INTEGER NOT NULL DEFAULT(0),
		mtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		FOREIGN KEY(server) REFERENCES server(serverid)
	`);
	fluxDB.dbConnection.run(`CREATE TRIGGER IF NOT EXISTS [UpdateUserMTime]
		AFTER UPDATE
		ON user
		FOR EACH ROW
		WHEN NEW.mtime = OLD.mtime
	BEGIN
		UPDATE user SET mtime = CURRENT_TIMESTAMP WHERE userid = OLD.userid;
	END
	`);
}