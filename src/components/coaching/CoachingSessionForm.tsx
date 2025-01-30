// src/components/coaching/CoachingSessionForm.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CoachingSessionFormProps {
  agents?: { id: string; name: string; }[];
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export function CoachingSessionForm({ agents = [], onSubmit, onCancel }: CoachingSessionFormProps) {
  const [formData, setFormData] = useState({
    coacheeId: '',
    date: '',
    type: 'WEEKLY_CHECKIN',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Schedule Coaching Session</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Team Member
            </label>
            <select
              value={formData.coacheeId}
              onChange={(e) => setFormData({ ...formData, coacheeId: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            >
              <option value="">Select team member</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date & Time
            </label>
            <input
              type="datetime-local"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Session Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            >
              <option value="WEEKLY_CHECKIN">Weekly Check-in</option>
              <option value="PERFORMANCE_REVIEW">Performance Review</option>
              <option value="SKILL_DEVELOPMENT">Skill Development</option>
              <option value="GOAL_SETTING">Goal Setting</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Session Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Add any preliminary notes or agenda items..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              Schedule Session
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}