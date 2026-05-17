import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const login = async (credentials: any) => {
  const response = await api.post('/auth/login', credentials);
  if (response.data.token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', response.data.token);
    }
  }
  return response.data;
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

export const getJobs = async (category?: string, status?: string, search?: string) => {
  const params: any = {};
  if (category && category !== 'All') params.category = category;
  if (status) params.status = status;
  if (search) params.search = search;
  
  const response = await api.get('/jobs', { params });
  return response.data;
};

export const getJob = async (id: string) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
};

export const createJob = async (data: any) => {
  const response = await api.post('/jobs', data);
  return response.data;
};

export const updateJobStatus = async (id: string, status: string) => {
  const response = await api.patch(`/jobs/${id}`, { status });
  return response.data;
};

export const deleteJob = async (id: string) => {
  const response = await api.delete(`/jobs/${id}`);
  return response.data;
};
