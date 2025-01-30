// src/app/team/[id]/page.tsx
import { prisma } from '@/lib/prisma';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { notFound } from 'next/navigation';

export default async function TeamMemberPage({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      manager: true,
      teamMembers: true,
      coachingSessions: {
        include: {
          metrics: true
        }
      }
    }
  });

  if (!user) {
    notFound();
  }

  const recentMetrics = user.coachingSessions.flatMap(session => 
    session.metrics.map(metric => ({
      ...metric,
      date: session.date
    }))
  ).sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Team Member Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Name</label>
                <p className="mt-1 text-sm text-gray-900">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="mt-1 text-sm text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Role</label>
                <p className="mt-1 text-sm text-gray-900">{user.role}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Manager</label>
                <p className="mt-1 text-sm text-gray-900">{user.manager?.name || 'N/A'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMetrics.length > 0 ? (
              recentMetrics.map((metric) => (
                <div 
                  key={metric.id} 
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{metric.name}</p>
                    <p className="text-sm text-gray-500">
                      {metric.date.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm font-medium text-gray-900">
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-500">
                      / {metric.target}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No performance metrics available</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Team Members (if manager) */}
      {user.teamMembers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {user.teamMembers.map((member) => (
                <div 
                  key={member.id}
                  className="p-4 border rounded-lg"
                >
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}