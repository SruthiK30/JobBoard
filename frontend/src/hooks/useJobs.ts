import { useState, useCallback } from 'react';
import { Job, PaginatedJobsResponse, jobService } from '../services/api';

export function useJobs(initialPage: number = 1, limit: number = 10) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(initialPage);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(
    async (pageNum: number) => {
      try {
        setLoading(true);
        setError(null);
        const response = await jobService.getJobs(pageNum, limit);
        
        if (pageNum === 1) {
          setJobs(response.data);
        } else {
          setJobs((prev) => [...prev, ...response.data]);
        }
        
        setPage(response.page);
        setTotal(response.total);
        setHasMore(response.hasMore);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch jobs';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [limit]
  );

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      fetchJobs(page + 1);
    }
  }, [page, hasMore, loading, fetchJobs]);

  const refresh = useCallback(() => {
    setJobs([]);
    setPage(1);
    fetchJobs(1);
  }, [fetchJobs]);

  return {
    jobs,
    page,
    total,
    hasMore,
    loading,
    error,
    fetchJobs,
    loadMore,
    refresh,
  };
}

export function useJobMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createJob = useCallback(
    async (title: string, description: string): Promise<Job | null> => {
      try {
        setLoading(true);
        setError(null);
        return await jobService.createJob(title, description);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create job';
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateJob = useCallback(
    async (id: string, title: string, description: string): Promise<Job | null> => {
      try {
        setLoading(true);
        setError(null);
        return await jobService.updateJob(id, title, description);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update job';
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteJob = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);
        await jobService.deleteJob(id);
        return true;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to delete job';
        setError(message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    error,
    createJob,
    updateJob,
    deleteJob,
  };
}
