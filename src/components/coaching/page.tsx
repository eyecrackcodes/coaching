// src/app/coaching/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CoachingSessionForm } from '@/components/coaching/CoachingSessionForm';

export default function CoachingPage() {
  const [showForm, setShowForm] = useState(false);
  const [sessions, setSessions] = useState<any[]>([]);
  const [agents, setAgents] = useState([]);

  // Fetch coaching sessions
  useEffect(() => {
    const fetchSessions = async () => {
      const response = await fetch('/api/coaching');
      const data = await response.json();
      setSessions(data);
    };

    fetchSessions();
  }, []);

  // Fetch team members (agents)
  useEffect(() => {
    const fetchAgents = async () => {
      const response = await fetch('/api/team?role=AGENT');
      const data = await response.json();
      setAgents(data);
    };

    fetchAgents();
  }, []);

  const handleCreateSession = async (formData: any) => {
    try {
      const response = await fetch('/api/coaching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          coachId: 'your-user-id', // This should come from authentication
        }),
      });

      if (!response.ok) throw new Error('Failed to create session');
      
      const newSession = await response.json();
      setSessions([newSession, ...sessions]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Coaching Sessions</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Schedule Session
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <CoachingSessionForm
              agents={agents}
              onSubmit={handleCreateSession}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {/* Sessions List */}
      <div className="grid gap-4">
        {sessions.map((session: any) => (
          <Card key={session.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Session with {session.coachee.name}
                  </h3>
                  <p className="text-sm text-gray-500">{formatDate(session.date)}</p>
                  <p className="text-sm text-gray-700 mt-2">{session.notes}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${
                  session.status === 'COMPLETED' 
                    ? 'bg-green-100 text-green-800'
                    : session.status === 'CANCELLED'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {session.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}