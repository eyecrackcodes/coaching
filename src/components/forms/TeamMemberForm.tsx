// src/components/forms/TeamMemberForm.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Role = 'DIRECTOR' | 'MANAGER' | 'AGENT' | 'MIT';

interface TeamMember {
  id?: string;
  name: string;
  email: string;
  role: Role;
  managerId?: string | null;
}

interface TeamMemberFormProps {
  initialData?: TeamMember;
  managers?: { id: string; name: string; }[];
  onSubmit: (data: TeamMember) => void;
  onCancel: () => void;
}

export function TeamMemberForm({ initialData, managers = [], onSubmit, onCancel }: TeamMemberFormProps) {
  const [formData, setFormData] = useState<TeamMember>(initialData || {
    name: '',
    email: '',
    role: 'AGENT',
    managerId: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Team Member' : 'Add Team Member'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as Role })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="AGENT">Agent</option>
              <option value="MANAGER">Manager</option>
              <option value="MIT">Manager in Training</option>
              <option value="DIRECTOR">Director</option>
            </select>
          </div>

          {formData.role === 'AGENT' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Manager
              </label>
              <select
                value={formData.managerId || ''}
                onChange={(e) => setFormData({ ...formData, managerId: e.target.value || null })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Select a manager</option>
                {managers.map((manager) => (
                  <option key={manager.id} value={manager.id}>
                    {manager.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {initialData ? 'Save Changes' : 'Add Member'}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}