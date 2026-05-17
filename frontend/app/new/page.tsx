'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { createJob } from '@/lib/api';
import { Loader2 } from 'lucide-react';

type FormData = {
  title: string;
  description: string;
  category: string;
  location: string;
  contactName: string;
  contactEmail: string;
};

export default function NewJob() {
  const router = useRouter();
  const [error, setError] = useState('');
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setError('');
      await createJob(data);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create job request.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-300">
      <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-sm border border-slate-200 p-8 sm:p-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Post a Service Request</h1>
        <p className="text-slate-500 mb-8 text-sm">Fill out the details below to find the right tradesperson for your job.</p>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Job Title <span className="text-rose-500">*</span></label>
            <input
              {...register('title', { required: 'Title is required' })}
              className={`w-full px-4 py-2.5 rounded-xl border ${errors.title ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} transition-all outline-none focus:ring-4 bg-white/50 focus:bg-white`}
              placeholder="e.g. Leaking kitchen tap"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description <span className="text-rose-500">*</span></label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={4}
              className={`w-full px-4 py-3 rounded-xl border ${errors.description ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} transition-all outline-none focus:ring-4 bg-white/50 focus:bg-white resize-none`}
              placeholder="Describe the issue in detail..."
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category <span className="text-rose-500">*</span></label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none bg-white/50 focus:bg-white"
              >
                <option value="">Select category...</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Painting">Painting</option>
                <option value="Joinery">Joinery</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && <p className="text-rose-500 text-xs mt-1">{errors.category.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Location <span className="text-rose-500">*</span></label>
              <input
                {...register('location', { required: 'Location is required' })}
                className={`w-full px-4 py-2.5 rounded-xl border ${errors.location ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} transition-all outline-none focus:ring-4 bg-white/50 focus:bg-white`}
                placeholder="e.g. Glasgow"
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
            </div>
          </div>

          <hr className="border-slate-100" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your Name</label>
              <input
                {...register('contactName')}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none bg-white/50 focus:bg-white"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address <span className="text-rose-500">*</span></label>
              <input
                {...register('contactEmail', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address"
                  }
                })}
                className={`w-full px-4 py-2.5 rounded-xl border ${errors.contactEmail ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} transition-all outline-none focus:ring-4 bg-white/50 focus:bg-white`}
                placeholder="john@example.com"
              />
              {errors.contactEmail && <p className="text-red-500 text-xs mt-1">{errors.contactEmail.message}</p>}
            </div>
          </div>

          <div className="pt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Post Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
