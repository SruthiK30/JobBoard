import axios from 'axios';

//const API_BASE = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

/* ===================== TYPES ===================== */

export interface Job {
  id: string;
  title: string;
  description: string;
  postedBy: string;
  datePosted: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedJobsResponse {
  data: Job[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;   // ✅ FIXED
}

/* ===================== SERVICES ===================== */

export const jobService = {
  getJobs: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedJobsResponse> => {
    const res = await apiClient.get('/jobs', { params: { page, limit } });
    return res.data;
  },

  createJob: async (title: string, description: string): Promise<Job> => {
    const res = await apiClient.post('/jobs', { title, description });
    return res.data;
  },

  updateJob: async (
    id: string,
    title: string,
    description: string
  ): Promise<Job> => {
    const res = await apiClient.put(`/jobs/${id}`, {
      title,
      description,
    });
    return res.data;
  },

  deleteJob: async (id: string): Promise<void> => {
    await apiClient.delete(`/jobs/${id}`);
  },
};
export const authService = {
  setRole: async (role: 'user' | 'admin') => {
    await apiClient.post('/api/auth/set-role', { role });
  },

  getRole: async (): Promise<string | null> => {
    const res = await apiClient.get('/api/auth/role');
    return res.data.role;
  },
};

