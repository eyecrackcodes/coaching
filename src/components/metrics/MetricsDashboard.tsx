// src/components/metrics/MetricsDashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface MetricsData {
  id: string;
  date: string;
  callsPerDay: number;
  talkTime: number;
  revenue: number;
  conversionRate: number;
}

export function MetricsDashboard({ userId }: { userId?: string }) {
  const [timeframe, setTimeframe] = useState<'week' | 'month'>('week');
  const [metrics, setMetrics] = useState<MetricsData[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - (timeframe === 'week' ? 7 : 30));

      const response = await fetch(
        `/api/metrics?userId=${userId}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );
      const data = await response.json();
      setMetrics(data);
    };

    fetchMetrics();
  }, [userId, timeframe]);

  const calculateAverage = (key: keyof MetricsData) => {
    if (metrics.length === 0) return 0;
    const sum = metrics.reduce((acc, curr) => acc + (curr[key] as number), 0);
    return (sum / metrics.length).toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setTimeframe('week')}
          className={`px-4 py-2 rounded-md ${
            timeframe === 'week'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Week
        </button>
        <button
          onClick={() => setTimeframe('month')}
          className={`px-4 py-2 rounded-md ${
            timeframe === 'month'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Month
        </button>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Daily Calls</p>
              <p className="text-2xl font-bold">{calculateAverage('callsPerDay')}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Talk Time (min)</p>
              <p className="text-2xl font-bold">{calculateAverage('talkTime')}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold">
                ${metrics.reduce((acc, curr) => acc + curr.revenue, 0).toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Conversion Rate</p>
              <p className="text-2xl font-bold">{calculateAverage('conversionRate')}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Calls & Talk Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => format(new Date(date), 'MMM d')}
                  />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="callsPerDay"
                    stroke="#8884d8"
                    name="Calls"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="talkTime"
                    stroke="#82ca9d"
                    name="Talk Time"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue & Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => format(new Date(date), 'MMM d')}
                  />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    name="Revenue"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="conversionRate"
                    stroke="#82ca9d"
                    name="Conversion Rate"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}