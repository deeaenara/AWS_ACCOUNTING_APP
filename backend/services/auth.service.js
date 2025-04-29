import db from '../models/db.config.js';

export const createUser = async ({ name, email, password, role }) => {
  const result = await db.query(
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
    [name, email, password, role]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};
