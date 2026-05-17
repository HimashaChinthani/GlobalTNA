'use client';

import { useState, useEffect } from 'react';
import JobCard from '@/components/JobCard';
import { getJobs } from '@/lib/api';
import { Filter, Search } from 'lucide-react';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Plumbing', 'Electrical', 'Painting', 'Joinery', 'Other'];

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchJobs();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [category, searchQuery]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await getJobs(
        category === 'All' ? undefined : category,
        undefined, // status
        searchQuery || undefined
      );
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Open Requests</h1>
          <p className="text-slate-500 mt-1">Browse and manage service requests in your area.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search jobs..." 
              className="bg-transparent text-sm outline-none w-full sm:w-56 text-slate-900 placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer pr-2"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-[200px] animate-pulse flex flex-col justify-between">
               <div className="h-5 bg-slate-200 rounded w-3/4 mb-4"></div>
               <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
               <div className="h-4 bg-slate-200 rounded w-5/6"></div>
               <div className="h-3 bg-slate-200 rounded w-1/2 mt-auto"></div>
            </div>
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 border-dashed">
          <div className="text-slate-400 mb-2 font-medium">No requests found</div>
          <p className="text-slate-500 text-sm">Try adjusting your search or be the first to post a new job!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job: any) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}