import PayrollDashboard from './PayrollDashboard';
import InvoiceList from './InvoiceList';
import ClientList from './ClientList';
import UserManagement from './UserManagement';

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">🏛️ Super Admin HQ</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PayrollDashboard />
        <InvoiceList />
        <ClientList />
        <UserManagement />
      </section>
    </div>
  );
}
