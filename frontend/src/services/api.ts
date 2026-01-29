import axios from 'axios';

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
  hasMore: boolean;
}

/* ===================== JOB SERVICE ===================== */

export const jobService = {
  getJobs: async (page = 1, limit = 14) => {
    const res = await apiClient.get('/api/jobs', { params: { page, limit } });
    return res.data;
  },

  createJob: async (title: string, description: string) => {
    const res = await apiClient.post('/api/jobs', { title, description });
    return res.data;
  },

  updateJob: async (id: string, title: string, description: string) => {
    const res = await apiClient.put(`/api/jobs/${id}`, { title, description });
    return res.data;
  },

  deleteJob: async (id: string) => {
    await apiClient.delete(`/api/jobs/${id}`);
  },
};

/* ===================== AUTH SERVICE ===================== */

export const authService = {
  setRole: async (role: 'user' | 'admin') => {
    await apiClient.post('/api/auth/set-role', { role });
  },

  getRole: async (): Promise<string | null> => {
    const res = await apiClient.get('/api/auth/role');
    return res.data.role;
  },
};
