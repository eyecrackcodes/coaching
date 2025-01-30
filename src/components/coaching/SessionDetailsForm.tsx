// src/components/coaching/SessionDetailsForm.tsx
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface KPI {
  metric: string;
  current: number;
  target: number;
}

interface SessionDetails {
  mainFocus: string;
  actionSteps: string[];
  kpis: KPI[];
  feedback: string;
  nextSteps: string;
}

export function SessionDetailsForm({ sessionId, onSubmit, initialData }: { 
  sessionId: string;
  onSubmit: (data: SessionDetails) => void;
  initialData?: SessionDetails;
}) {
  const [formData, setFormData] = useState<SessionDetails>(initialData || {
    mainFocus: '',
    actionSteps: [''],
    kpis: [{ metric: '', current: 0, target: 0 }],
    feedback: '',
    nextSteps: ''
  });

  const addActionStep = () => {
    setFormData({
      ...formData,
      actionSteps: [...formData.actionSteps, '']
    });
  };

  const addKPI = () => {
    setFormData({
      ...formData,
      kpis: [...formData.kpis, { metric: '', current: 0, target: 0 }]
    });
  };

  const updateActionStep = (index: number, value: string) => {
    const newActionSteps = [...formData.actionSteps];
    newActionSteps[index] = value;
    setFormData({ ...formData, actionSteps: newActionSteps });
  };

  const updateKPI = (index: number, field: keyof KPI, value: string | number) => {
    const newKPIs = [...formData.kpis];
    newKPIs[index] = { ...newKPIs[index], [field]: value };
    setFormData({ ...formData, kpis: newKPIs });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Coaching Session Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Focus Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Focus Area
            </label>
            <textarea
              value={formData.mainFocus}
              onChange={(e) => setFormData({ ...formData, mainFocus: e.target.value })}
              className="w-full p-2 border rounded-md"
              rows={2}
              placeholder="What's the one key area we're focusing on this week?"
              required
            />
          </div>

          {/* Action Steps */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Action Steps
            </label>
            {formData.actionSteps.map((step, index) => (
              <div key={index} className="mb-2 flex gap-2">
                <input
                  type="text"
                  value={step}
                  onChange={(e) => updateActionStep(index, e.target.value)}
                  className="flex-1 p-2 border rounded-md"
                  placeholder={`Step ${index + 1}`}
                  required
                />
                {index === formData.actionSteps.length - 1 && (
                  <button
                    type="button"
                    onClick={addActionStep}
                    className="px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                  >
                    + Add Step
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* KPIs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Performance Indicators
            </label>
            {formData.kpis.map((kpi, index) => (
              <div key={index} className="mb-2 grid grid-cols-5 gap-2">
                <input
                  type="text"
                  value={kpi.metric}
                  onChange={(e) => updateKPI(index, 'metric', e.target.value)}
                  className="col-span-2 p-2 border rounded-md"
                  placeholder="Metric name"
                  required
                />
                <input
                  type="number"
                  value={kpi.current}
                  onChange={(e) => updateKPI(index, 'current', parseFloat(e.target.value))}
                  className="p-2 border rounded-md"
                  placeholder="Current"
                  required
                />
                <input
                  type="number"
                  value={kpi.target}
                  onChange={(e) => updateKPI(index, 'target', parseFloat(e.target.value))}
                  className="p-2 border rounded-md"
                  placeholder="Target"
                  required
                />
                {index === formData.kpis.length - 1 && (
                  <button
                    type="button"
                    onClick={addKPI}
                    className="px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                  >
                    + Add KPI
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Feedback */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Feedback
            </label>
            <textarea
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              className="w-full p-2 border rounded-md"
              rows={3}
              placeholder="What went well? What could be improved?"
              required
            />
          </div>

          {/* Next Steps */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Next Steps
            </label>
            <textarea
              value={formData.nextSteps}
              onChange={(e) => setFormData({ ...formData, nextSteps: e.target.value })}
              className="w-full p-2 border rounded-md"
              rows={2}
              placeholder="What are the immediate next steps?"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Session Details
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}