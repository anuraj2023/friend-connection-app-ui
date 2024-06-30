import axios from 'axios';
import { User, FriendStatus } from '../types';

const API_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

interface LoginResponse {
    access_token: string;
    token_type: string;
  }

  export const setupAuthToken = () => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  };
  
  export const loginUser = async (username: string, password: string): Promise<User> => {
    const response = await api.post<LoginResponse>('/users/login', { username, password });
    const { access_token, token_type } = response.data;
    
    // Store the token in sessionStorage
    sessionStorage.setItem('authToken', access_token);
    
    // Set the default Authorization header for future requests
    api.defaults.headers.common['Authorization'] = `${token_type} ${access_token}`;
    
    // You might need to make another API call to get the user details
    const userResponse = await api.get<User>('/user');
    return userResponse.data;
  };

  export const logoutUser = async (): Promise<void> => {
    try {
      await api.post('/users/logout');
    } finally {
      // Remove the token from sessionStorage
      sessionStorage.removeItem('authToken');
      // Remove the Authorization header
      delete api.defaults.headers.common['Authorization'];
    }
  };

export const signup = async (username: string, email: string, password: string): Promise<User> => {
  const response = await api.post('/users/signup', { username, email, password });
  return response.data;
};

export const searchUsers = async (query: string): Promise<User[]> => {
  const response = await api.get('/users/search', { params: { q: query } });
  return response.data;
};

export const getFriendStatuses = async (): Promise<FriendStatus[]> => {
  const response = await api.get('/friends/statuses');
  return response.data;
};

export const updateStatus = async (status: string): Promise<FriendStatus> => {
  const response = await api.post('/status/update', { status });
  return response.data;
};

export const sendFriendRequest = async (userId: string): Promise<void> => {
  await api.post('/friends/request', { userId });
};

export const acceptFriendRequest = async (requestId: string): Promise<void> => {
  await api.post(`/friends/request/${requestId}/accept`);
};

export const rejectFriendRequest = async (requestId: string): Promise<void> => {
  await api.post(`/friends/request/${requestId}/reject`);
};