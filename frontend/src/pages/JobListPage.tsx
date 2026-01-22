import React, { useEffect, useState } from 'react';
import { Job } from '../services/api';
import { JobCard } from '../components/JobCard';
import { useJobs, useJobMutations } from '../hooks/useJobs';
import { JobForm } from '../components/JobForm';

interface JobListProps {
  role: 'user' | 'admin';
  onLogout: () => void;
}

export function JobList({ role, onLogout }: JobListProps) {
  const { jobs, page, total, hasMore, loading, error, fetchJobs, loadMore, refresh } =
    useJobs(1, 10);
  const { loading: mutating, error: mutationError, createJob, updateJob, deleteJob } =
    useJobMutations();
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchJobs(1);
  }, []);

  const handleCreateJob = async (title: string, description: string) => {
    const newJob = await createJob(title, description);
    if (newJob) {
      setShowForm(false);
      refresh();
    }
  };

  const handleUpdateJob = async (title: string, description: string) => {
    if (!editingJob) return;
    const updated = await updateJob(editingJob.id, title, description);
    if (updated) {
      setEditingJob(null);
      refresh();
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      const success = await deleteJob(id);
      if (success) {
        refresh();
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingJob(null);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col"
      style={{
        backgroundImage: 'url(/education-bg.svg)',
        backgroundColor: '#f8f9fa',
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Header */}
      <header className="relative z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Job Board</h1>
            <p className="text-gray-600">
              {role === 'admin' ? '🔑 Admin' : '👤 User'} · {total} Jobs Available
            </p>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8 flex-1">
        {/* Admin Form */}
        {role === 'admin' && (
          <>
            {editingJob ? (
              <JobForm
                job={editingJob}
                onSubmit={handleUpdateJob}
                onCancel={handleCancel}
                loading={mutating}
              />
            ) : showForm ? (
              <JobForm
                onSubmit={handleCreateJob}
                onCancel={handleCancel}
                loading={mutating}
              />
            ) : (
              <button
                onClick={() => setShowForm(true)}
                className="w-full mb-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md"
              >
                + Create New Job
              </button>
            )}
          </>
        )}

        {/* Errors */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {mutationError && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {mutationError}
          </div>
        )}

        {/* Jobs Grid */}
        {loading && jobs.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
              </div>
              <p className="mt-4 text-gray-600">Loading jobs...</p>
            </div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">No jobs available yet.</p>
            {role === 'admin' && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Create the first job
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-6">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isAdmin={role === 'admin'}
                  onEdit={() => setEditingJob(job)}
                  onDelete={handleDeleteJob}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md disabled:cursor-not-allowed"
                >
                  {loading ? 'Loading...' : `Load More (${total - jobs.length} remaining)`}
                </button>
              </div>
            )}

            {/* Empty State for Load More */}
            {!hasMore && jobs.length > 0 && (
              <div className="text-center mt-8 text-gray-600">
                <p>You've reached the end! All {total} jobs loaded.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
