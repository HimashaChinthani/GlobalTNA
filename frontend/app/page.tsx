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
    fetchJobs();
  }, [category]); // We will trigger search manually with the form submit

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
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Open Requests</h1>
          <p className="text-gray-500 mt-1">Browse and manage service requests in your area.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <form 
            onSubmit={(e) => { e.preventDefault(); fetchJobs(); }} 
            className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
          >
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search jobs..." 
              className="bg-transparent text-sm outline-none w-full sm:w-48 text-gray-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-transparent text-sm font-medium text-gray-700 outline-none cursor-pointer pr-2"
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
            <div key={n} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-[200px] animate-pulse flex flex-col justify-between">
               <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
               <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
               <div className="h-4 bg-gray-200 rounded w-5/6"></div>
               <div className="h-3 bg-gray-200 rounded w-1/2 mt-auto"></div>
            </div>
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100 border-dashed">
          <div className="text-gray-400 mb-2">No requests found</div>
          <p className="text-gray-500 text-sm">Be the first to post a new job in this category!</p>
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