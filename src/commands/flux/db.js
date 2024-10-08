import { Database } from "../../db/db.js";

export const type = 'DB_INIT';
export const FLUX_DB = new Database("flux.db");
export const init = () => {
	const createUserUpdateTrigger = () => {
		FLUX_DB.dbConnection.run(`CREATE TRIGGER IF NOT EXISTS [UpdateUserMTime]
			AFTER UPDATE
			ON user
			FOR EACH ROW
			WHEN NEW.mtime = OLD.mtime
		BEGIN
			UPDATE user SET mtime = CURRENT_TIMESTAMP WHERE userid = OLD.userid;
		END
		`);
	};
	FLUX_DB.createTable("user", `
		userid INTEGER NOT NULL,
		serverid INTEGER NOT NULL,
		flux INTEGER NOT NULL DEFAULT(0),
		mtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		PRIMARY KEY (userid, serverid)
	`, createUserUpdateTrigger);
};

// initUser
// 	Initialize userdata if it isn't present for server
// Params:
// 	userId - id of user
// 	serverId - id of server
export const initUser = (userId, serverId) => {
	FLUX_DB.dbConnection.run(`INSERT INTO user (userid, serverid) VALUES (${userId}, ${serverId}) ON CONFLICT DO NOTHING`);
}

// updateBalance
// 	Update user balance
// 	Init user if they don't exist
// Params:
// 	userId - id of user who's balance is being checked
// 	serverId - id of server user is getting balance in
// 	add - amount of flux to add to balance
// Returns:
// 	User's balance after updating
export const updateBalance = async (userId, serverId, add=0) => {
	return new Promise((resolve, reject) => {
		FLUX_DB.dbConnection.get(`INSERT INTO user (userid, serverid) VALUES (${userId}, ${serverId}) ON CONFLICT DO
		UPDATE SET flux = flux + (unixepoch(CURRENT_TIMESTAMP) - unixepoch(mtime))/12 + ${add} RETURNING flux;`, (err, row) => {
			if (err) {
				reject(err);
			} else {
				resolve(row.flux);
			}
		});
	})
}