import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

db.connect()
    .then(() => console.log("✅ Connected to the database!"))
    .catch(err => {
        console.error("❌ Database connection error:", err.message);
        process.exit(1);
    });

db.on('error', (err) => {
    console.error("⚠️ Unexpected DB error:", err.message);
    process.exit(-1);
});

export const query = (text, params) => {
    console.log(`📡 Executing query: ${text}, params: ${params}`);
    return db.query(text, params);
};

export default db;