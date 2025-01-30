// src/app/metrics/page.tsx
import { MetricsDashboard } from '@/components/metrics/MetricsDashboard';
import { DailyMetricsForm } from '@/components/metrics/DailyMetricsForm';

export default function MetricsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Performance Metrics</h1>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Dashboard takes up 2/3 of the space */}
        <div className="lg:col-span-2">
          <MetricsDashboard />
        </div>

        {/* Form takes up 1/3 of the space */}
        <div>
          <DailyMetricsForm 
            onSubmit={async (data: any) => {
              try {
                const response = await fetch('/api/metrics', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                });
                
                if (!response.ok) throw new Error('Failed to save metrics');
                
                // Refresh the page or update the dashboard
                window.location.reload();
              } catch (error) {
                console.error('Error saving metrics:', error);
                // Show error message to user
              }
            }} 
          />
        </div>
      </div>
    </div>
  );
}