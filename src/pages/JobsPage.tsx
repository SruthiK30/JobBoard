import JobList from "../components/JobList";
import JobForm from "../components/JobForm";
import { useJobs } from "../hooks/useJobs";
import { useRole } from "../context/RoleContext";

const JobsPage = () => {
  const { role } = useRole();
  const { jobs, loading, error, hasMore, loadMore, deleteJob } = useJobs(1, 10);

  // ⛔ safety: role must exist (ProtectedRoute already enforces this)
  if (!role) return null;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Job Listings</h1>

      {/* Admin can create job */}
      {role === "admin" && <JobForm onSuccess={() => window.location.reload()} />}

      {/* Loading */}
      {loading && <p className="mt-4">Loading jobs...</p>}

      {/* Error */}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Job List */}
      {!loading && jobs.length > 0 && (
        <JobList jobs={jobs} role={role} onDelete={deleteJob} />
      )}

      {/* Empty */}
      {!loading && jobs.length === 0 && (
        <p className="mt-4 text-gray-500">No jobs found</p>
      )}

      {/* Load More */}
      {hasMore && !loading && (
        <button
          onClick={loadMore}
          className="mt-6 px-4 py-2 bg-black text-white rounded"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default JobsPage;
