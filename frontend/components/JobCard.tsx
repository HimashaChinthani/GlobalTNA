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
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 p-6 h-full flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 break-words group-hover:text-indigo-600 transition-colors">{job.title}</h3>
            <span className="inline-block mt-2 px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-md border border-indigo-100">
              {job.category}
            </span>
          </div>
        </div>
        
        <p className="text-slate-600 text-sm line-clamp-2 mb-5 break-words leading-relaxed">{job.description}</p>
        
        <div className="space-y-2.5 text-sm text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400" />
            {job.location}
          </div>
          {job.budget && (
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-slate-400" />
              ${job.budget}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-5 pt-5 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Clock className="w-3.5 h-3.5" />
          {job.postedAt ? formatDate(job.postedAt) : 'Recently posted'}
        </div>
        <Link href={`/job/${job._id}`} className="px-4 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white text-sm font-semibold rounded-lg transition-colors duration-200">
          View
        </Link>
      </div>
    </div>
  );
}
