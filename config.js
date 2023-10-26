const dotenv = require("dotenv");
const assert = require("assert");

// Dotenv loads .env as environmental variables and also exports them
dotenv.config();

// Setting process environmental variables...
const {
	PORT,
	HOST,
	HOST_URL,
	API_KEY,
	AUTH_DOMAIN,
	DATABASE_URL,
	PROJECT_ID,
	STORAGE_BUCKET,
	MESSAGING_SENDER_ID,
	APP_ID,
} = process.env;

// We use assert here to check if PORT & HOST variables exist
// If they don't exist, the second parameter will be logged
// Argument #1: The item to check
// Argument #2: What will be logged is it returns false or null
assert(PORT, "port is required");

assert(HOST, "host is required");

// Exporting all environmental variables so we can access
// them throughout the server application

module.exports = {
	port: PORT,
	host: HOST,
	url: HOST_URL,
	firebaseConfig: {
		apiKey: API_KEY,
		authDomain: AUTH_DOMAIN,
		databaseURL: DATABASE_URL,
		projectId: PROJECT_ID,
		storageBucket: STORAGE_BUCKET,
		messagingSenderId: MESSAGING_SENDER_ID,
		appId: APP_ID,
	},
};
