import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'ivo',
  host: 'localhost',
  database: 'items',
  password: 'password',
  port: 5432,
});
