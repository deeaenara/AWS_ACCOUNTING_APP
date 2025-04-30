import db from '../models/db.config.js';

export const createCase = async ({ client_id, title, description, status }) => {
  const res = await db.query(
    'INSERT INTO cases (client_id, title, description, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [client_id, title, description, status]
  );
  return res.rows[0];
};

export const getCases = async () => {
  return (await db.query('SELECT * FROM cases ORDER BY opened_on DESC')).rows;
};

export const getCaseById = async (id) => {
  return (await db.query('SELECT * FROM cases WHERE id = $1', [id])).rows[0];
};

export const updateCase = async (id, data) => {
  const { title, description, status, closed_on } = data;
  return (await db.query(
    'UPDATE cases SET title=$1, description=$2, status=$3, closed_on=$4 WHERE id=$5 RETURNING *',
    [title, description, status, closed_on, id]
  )).rows[0];
};

export const deleteCase = async (id) => {
  await db.query('DELETE FROM cases WHERE id = $1', [id]);
};
