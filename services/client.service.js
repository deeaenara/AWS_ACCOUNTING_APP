import db from '../config/db.config.js';

export const createClient = async ({ name, company, email, phone }) => {
    const result = await db.query(
        'INSERT INTO clients (name, company, email, phone) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, company, email, phone]
    );
    return result.rows[0];
};

export const getAllClients = async () => {
    const result = await db.query('SELECT * FROM clients ORDER BY created_at DESC');
    return result.rows;
};

export const getClientById = async (id) => {
    const result = await db.query('SELECT * FROM clients WHERE id = $1', [id]);
    return result.rows[0];
};

export const updateClient = async (id, data) => {
    const { name, company, email, phone } = data;
    const result = await db.query(
        'UPDATE clients SET name=$1, company=$2, email=$3, phone=$4 WHERE id=$5 RETURNING *',
        [name, company, email, phone, id]
    );
    return result.rows[0];
};

export const deleteClient = async (id) => {
    await db.query('DELETE FROM clients WHERE id = $1', [id]);
};
