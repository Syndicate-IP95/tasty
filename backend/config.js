require("dotenv").config();

module.exports = {
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
	key: process.env.jwt_secret_key,
	ssl: { rejectUnauthorized: false },
}