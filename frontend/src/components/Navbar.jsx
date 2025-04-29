import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PayrollList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/payroll', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setData(res.data));
  }, []);

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-xl font-bold mb-4">📋 Payroll Records</h2>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Month</th>
            <th className="p-3">Salary</th>
            <th className="p-3">Total Paid</th>
            <th className="p-3">PDF</th>
          </tr>
        </thead>
        <tbody>
          {data.map(pay => (
            <tr key={pay.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{pay.name}</td>
              <td className="p-3">{pay.month}</td>
              <td className="p-3">AED {pay.salary.toFixed(2)}</td>
              <td className="p-3">AED {pay.total_paid.toFixed(2)}</td>
              <td className="p-3">
                <a
                  href={`/api/payroll/payslip/${pay.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollList;
