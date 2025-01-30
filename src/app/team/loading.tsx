// src/app/team/loading.tsx
import { Card } from '@/components/ui/card';

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-4"></div>
        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse mt-2"></div>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse mt-2"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}