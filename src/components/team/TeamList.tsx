// src/components/team/TeamList.tsx
'use client';

import { useState, useEffect } from 'react';

interface Office {
  id: string;
  name: string;
}

interface TeamFormProps {
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export function TeamForm({ onSubmit, onCancel }: TeamFormProps) {
  const [offices, setOffices] = useState<Office[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'AGENT',
    officeId: '',
  });

  useEffect(() => {
    // Fetch offices when component mounts
    const fetchOffices = async () => {
      try {
        const response = await fetch('/api/office');
        if (response.ok) {
          const data = await response.json();
          setOffices(data);
          if (data.length > 0) {
            setFormData(prev => ({ ...prev, officeId: data[0].id }));
          }
        }
      } catch (error) {
        console.error('Error fetching offices:', error);
      }
    };

    fetchOffices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* ... other form fields ... */}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Office
        </label>
        <select
          value={formData.officeId}
          onChange={(e) => setFormData({ ...formData, officeId: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          {offices.map((office) => (
            <option key={office.id} value={office.id}>
              {office.name}
            </option>
          ))}
        </select>
      </div>

      {/* Submit buttons */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg"
        >
          Add Member
        </button>
      </div>
    </form>
  );
}