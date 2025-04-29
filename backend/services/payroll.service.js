import db from '../models/db.config.js';

export const createPayroll = async ({ user_id, month, salary, bonus = 0, deductions = 0 }) => {
  const total_paid = salary + bonus - deductions;
  const result = await db.query(
    'INSERT INTO payrolls (user_id, month, salary, bonus, deductions, total_paid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [user_id, month, salary, bonus, deductions, total_paid]
  );
  return result.rows[0];
};

export const getPayrolls = async () => {
  return (await db.query(`
    SELECT p.*, u.name, u.role 
    FROM payrolls p 
    JOIN users u ON u.id = p.user_id 
    ORDER BY p.paid_on DESC`)).rows;
};

export const getPayrollByUser = async (user_id) => {
  return (await db.query('SELECT * FROM payrolls WHERE user_id = $1 ORDER BY paid_on DESC', [user_id])).rows;
};

export const deletePayroll = async (id) => {
  await db.query('DELETE FROM payrolls WHERE id = $1', [id]);
};

//ROI calc SuperAdmin
export const getUserROI = async () => {
  return (await db.query(`
    SELECT 
      u.id,
      u.name,
      u.role,
      COALESCE(SUM(i.amount), 0) AS total_billed,
      COALESCE(SUM(p.total_paid), 0) AS total_salary,
      CASE
        WHEN SUM(p.total_paid) = 0 THEN NULL
        ELSE ROUND(((SUM(i.amount) - SUM(p.total_paid)) / SUM(p.total_paid)) * 100, 2)
      END AS roi_percent
    FROM users u
    LEFT JOIN invoices i ON i.client_id = u.id
    LEFT JOIN payrolls p ON p.user_id = u.id
    GROUP BY u.id
    ORDER BY roi_percent DESC NULLS LAST
  `)).rows;
};
