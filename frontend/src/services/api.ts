import axios from 'axios';

const API_BASE = 'https://jobboard-backend-coya.onrender.com';

const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

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

export const jobService = {
  async getJobs(page: number, limit: number): Promise<PaginatedJobsResponse> {
    const response = await apiClient.get<PaginatedJobsResponse>('/jobs', {
      params: { page, limit },
    });
    return response.data;
  },

  async getJob(id: string): Promise<Job> {
    const response = await apiClient.get<Job>(`/jobs/${id}`);
    return response.data;
  },

  async createJob(title: string, description: string): Promise<Job> {
    const response = await apiClient.post<Job>('/jobs', {
      title,
      description,
    });
    return response.data;
  },

  async updateJob(id: string, title: string, description: string): Promise<Job> {
    const response = await apiClient.put<Job>(`/jobs/${id}`, {
      title,
      description,
    });
    return response.data;
  },

  async deleteJob(id: string): Promise<void> {
    await apiClient.delete(`/jobs/${id}`);
  },
};

export const authService = {
  async setRole(role: 'user' | 'admin'): Promise<void> {
    await apiClient.post('/auth/set-role', { role });
  },

  async getRole(): Promise<string | null> {
    const response = await apiClient.get<{ role: string | null }>('/auth/role');
    return response.data.role;
  },
};
