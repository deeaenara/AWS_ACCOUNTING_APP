import db from '../models/db.config.js';

export const createInvoice = async ({ client_id, case_id, amount, due_date }) => {
  return (await db.query(
    'INSERT INTO invoices (client_id, case_id, amount, due_date) VALUES ($1, $2, $3, $4) RETURNING *',
    [client_id, case_id, amount, due_date]
  )).rows[0];
};

export const getAllInvoices = async () => {
  return (await db.query('SELECT * FROM invoices ORDER BY issued_on DESC')).rows;
};

export const getInvoiceById = async (id) => {
  return (await db.query('SELECT * FROM invoices WHERE id = $1', [id])).rows[0];
};

export const updateInvoice = async (id, data) => {
  const { amount, status, due_date } = data;
  return (await db.query(
    'UPDATE invoices SET amount=$1, status=$2, due_date=$3 WHERE id=$4 RETURNING *',
    [amount, status, due_date, id]
  )).rows[0];
};

export const deleteInvoice = async (id) => {
  await db.query('DELETE FROM invoices WHERE id = $1', [id]);
};
