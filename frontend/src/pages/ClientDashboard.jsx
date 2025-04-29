import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClientDashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [retainer, setRetainer] = useState(0);

  useEffect(() => {
    axios.get('/api/client-self/invoices', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setInvoices(res.data));

    axios.get('/api/client-self/retainer', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setRetainer(res.data.balance));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Welcome, Client</h2>
      <p className="mb-4">💼 Retainer Balance: AED {retainer}</p>
      <h3 className="text-lg font-semibold mb-2">📋 Invoices</h3>
      <ul className="space-y-2">
        {invoices.map(inv => (
          <li key={inv.id} className="p-4 bg-white shadow rounded">
            <p>Invoice ID: #{inv.id}</p>
            <p>Amount: AED {inv.amount}</p>
            <p>Status: {inv.status}</p>
            <a href={`/api/invoices/pdf/${inv.id}`} target="_blank" className="text-blue-500 underline">
              Download PDF
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientDashboard;

