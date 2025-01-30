// src/app/coaching/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function CoachingSessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [userRole, setUserRole] = useState('MANAGER'); // This will come from auth

  useEffect(() => {
    const fetchSessions = async () => {
      // This will be filtered based on user role and ID
      const response = await fetch('/api/coaching');
      const data = await response.json();
      setSessions(data);
    };

    fetchSessions();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Coaching Sessions</h1>
      {/* Session list */}
    </div>
  );
}