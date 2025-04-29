CREATE TABLE payrolls (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  month VARCHAR(20),
  salary NUMERIC(10, 2),
  bonus NUMERIC(10, 2) DEFAULT 0,
  deductions NUMERIC(10, 2) DEFAULT 0,
  total_paid NUMERIC(10, 2),
  paid_on DATE DEFAULT CURRENT_DATE
);
