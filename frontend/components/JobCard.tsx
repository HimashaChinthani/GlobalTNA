'use client';

import { MapPin, Clock, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface Job {
  _id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  budget?: number;
  postedAt?: string;
}

export default function JobCard({ job }: { job: Job }) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-6 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 break-words">{job.title}</h3>
            <span className="inline-block mt-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
              {job.category}
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 break-words">{job.description}</p>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            {job.location}
          </div>
          {job.budget && (
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              ${job.budget}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          {job.postedAt ? formatDate(job.postedAt) : 'Recently posted'}
        </div>
        <Link href={`/job/${job._id}`} className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
          View
        </Link>
      </div>
    </div>
  );
}
