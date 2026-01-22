//import React from "react";
import type { Job } from "../types/job.types";

interface JobListProps {
  jobs: Job[];
  role: "user" | "admin";
  onDelete: (id: string) => void;
}

const JobList = ({ jobs, role, onDelete }: JobListProps) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

      
      {jobs.map(job => (
        <div key={job._id} className="border p-4 rounded shadow">
          <h2 className="font-bold">{job.title}</h2>
          <p>Posted by: {job.author}</p>
          <p>{job.description}</p>
          {role === "admin" && (
            <div className="mt-2 flex gap-2">
              <button className="bg-yellow-400 px-2 py-1 rounded">Edit</button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => onDelete(job._id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default JobList;

