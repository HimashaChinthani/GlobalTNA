'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getJob, updateJobStatus, deleteJob } from '@/lib/api';
import { MapPin, Tag, Clock, User, Mail, Trash2, ArrowLeft, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

export default function JobDetail() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [params.id]);

  const fetchJob = async () => {
    try {
      const data = await getJob(params.id as string);
      setJob(data);
    } catch (error) {
      console.error('Failed to fetch job', error);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setUpdating(true);
    try {
      const updated = await updateJobStatus(job._id, newStatus);
      setJob(updated);
    } catch (error) {
      console.error('Failed to update status', error);
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this request?')) return;
    setDeleting(true);
    try {
      await deleteJob(job._id);
      router.push('/');
    } catch (error) {
      console.error('Failed to delete job', error);
      alert('Failed to delete job');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to requests
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
            <div className="flex items-center gap-3">
              {updating && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
              <select
                value={job.status}
                onChange={handleStatusChange}
                disabled={updating}
                className="bg-gray-50 border border-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none cursor-pointer"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-100">
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
              <Tag className="w-4 h-4 text-gray-400" />
              {job.category}
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
              <MapPin className="w-4 h-4 text-gray-400" />
              {job.location}
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
              <Clock className="w-4 h-4 text-gray-400" />
              {job.createdAt ? format(new Date(job.createdAt), 'PPP') : 'N/A'}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {job.description}
            </p>
          </div>

          <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-sm font-semibold text-blue-900 mb-4 uppercase tracking-wider">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Name</div>
                  <div className="font-medium text-gray-900">{job.contactName || 'Not provided'}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Email</div>
                  <a href={`mailto:${job.contactEmail}`} className="font-medium text-blue-600 hover:underline">
                    {job.contactEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            Delete Request
          </button>
        </div>
      </div>
    </div>
  );
}
