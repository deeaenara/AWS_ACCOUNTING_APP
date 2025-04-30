import db from '../models/db.config.js';

export const createOrUpdateRetainer = async ({ client_id, balance }) => {
  const existing = await db.query('SELECT * FROM retainers WHERE client_id = $1', [client_id]);
  if (existing.rows.length > 0) {
    return (await db.query(
      'UPDATE retainers SET balance = $1, last_updated = NOW() WHERE client_id = $2 RETURNING *',
      [balance, client_id]
    )).rows[0];
  } else {
    return (await db.query(
      'INSERT INTO retainers (client_id, balance) VALUES ($1, $2) RETURNING *',
      [client_id, balance]
    )).rows[0];
  }
};

export const getRetainerByClient = async (client_id) => {
  return (await db.query('SELECT * FROM retainers WHERE client_id = $1', [client_id])).rows[0];
};
