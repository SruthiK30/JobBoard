import React from 'react';
import { Job } from '../services/api';

interface JobCardProps {
  job: Job;
  onEdit?: (job: Job) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

export function JobCard({
  job,
  onEdit,
  onDelete,
  isAdmin = false,
}: JobCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-xl font-bold text-gray-800 flex-1">{job.title}</h2>
        {isAdmin && (
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => onEdit?.(job)}
              className="text-blue-500 hover:text-blue-700 font-medium text-sm transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete?.(job.id)}
              className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Posted by: {job.postedBy}</span>
        <span>{formatDate(job.datePosted)}</span>
      </div>
    </div>
  );
}
