import { createPool, Pool } from "mysql2/promise";
import { readFileSync } from "fs";
import { join } from "path";
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from "../src/config";

async function getPool(): Promise<Pool> {
    return createPool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        port: Number(DB_PORT),
        multipleStatements: true,
    });
}

async function up(): Promise<void> {
    const pool = await getPool();

    await pool.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    await pool.query(`USE \`${DB_NAME}\``);

    const sql = readFileSync(join(__dirname, "001_initial_schema.sql"), "utf-8");
    await pool.query(sql);

    console.log("Migration 001 executed successfully");
    await pool.end();
}

async function down(): Promise<void> {
    const pool = await getPool();

    await pool.query(`USE \`${DB_NAME}\``);
    await pool.query("DROP TABLE IF EXISTS posts");
    await pool.query("DROP TABLE IF EXISTS dea_points");
    await pool.query("DROP TABLE IF EXISTS users");

    console.log("Rollback 001 executed successfully");
    await pool.end();
}

async function main(): Promise<void> {
    const command = process.argv[2];

    if (command === "down") {
        await down();
    } else if (command === "up" || !command) {
        await up();
    } else {
        console.error('Usage: npx ts-node db/migrate.ts [up|down]');
        process.exit(1);
    }
}

main().catch(err => {
    console.error("Migration failed:", err);
    process.exit(1);
});
