import { createPool } from "mysql2/promise";

export async function connect() {

    // Cambiar por valores de su entorno o configuración
    const connection = await createPool({
        host: 'localhost',
        user: 'donnachie',
        database: 'dea',
        port: 8889,
        connectionLimit: 10000
    })

    return connection;
}