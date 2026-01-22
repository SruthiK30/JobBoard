import { useState, useEffect } from "react";
import type { Job } from "../types/job.types";
import { fetchJobs as fetchJobsApi, deleteJob as deleteJobApi } from "../api/jobs.api";

export const useJobs = (initialPage = 1, limit = 10) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async (pageToFetch = page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJobsApi(pageToFetch, limit);
      if (pageToFetch === 1) {
        setJobs(data.jobs);
      } else {
        setJobs(prev => [...prev, ...data.jobs]);
      }
      setHasMore(data.hasMore);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore) setPage(prev => prev + 1);
  };

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  const deleteJob = async (id: string) => {
    try {
      await deleteJobApi(id);
      setJobs(prev => prev.filter(job => job._id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return { jobs, loading, error, hasMore, fetchJobs, loadMore, deleteJob };
};
