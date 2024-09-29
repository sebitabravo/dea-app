import { createPool } from "mysql2/promise";

export async function connect() {

    // Cambiar por valores de su entorno o configuración
    const connection = await createPool({
        host: 'localhost',
        user: 'donnachie',
        database: 'calendar',
        port: 8889,
        connectionLimit: 10
    })

    return connection;
}