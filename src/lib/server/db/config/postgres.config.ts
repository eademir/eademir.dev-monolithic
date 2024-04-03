import { Client } from 'pg';

export const client = new Client({
    host: 'localhost',
    port: 5334,
    database: 'name',
    user: 'user',
    password: 'password',
});
