import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PayrollDashboard = () => {
  const [roiData, setRoiData] = useState([]);

  useEffect(() => {
    axios.get('/api/payroll/roi', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
      setRoiData(res.data);
    });
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">💹 Staff ROI Report</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={roiData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="roi_percent" fill="#34d399" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PayrollDashboard;
