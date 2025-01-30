// src/app/page.tsx
import DashboardLayout from '@/components/layout/DashboardLayout';
import Dashboard from '@/components/dashboard/Dashboard';

export default function Page() {
  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
}