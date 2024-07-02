import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { User, FriendStatus, StatusUpdateResponse, FriendRequest, LoginResponse, UserWithStatus } from '../types';

const isTokenExpired = () => {
  const token = Cookies.get('access_token');
  if (!token) return true;

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  return decodedToken? decodedToken.exp? (decodedToken.exp < currentTime) :true :true;
};

// Use this function before making API calls
const ensureValidToken = async () => {
  if (isTokenExpired()) {
    // Redirect to login page or show login modal
    // You might want to implement a refresh token mechanism here
  }
};

const API_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  await ensureValidToken();
  return config;
}, (error) => {
  return Promise.reject(error);
});
    
export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await api.post('/user/login', { username, password }, { withCredentials: true });
  const { access_token } = response.data as LoginResponse;
  
  // Set the access token in a cookie
  Cookies.set('access_token', access_token, { expires: 30/1440 }); // expires in 30 minutes

  return response.data;
};

  export const logoutUser = async (): Promise<void> => {
    try {
      await api.post('/user/logout');
    } finally {
      // Remove the token from sessionStorage
      sessionStorage.removeItem('authToken');
      // Remove the Authorization header
      delete api.defaults.headers.common['Authorization'];
    }
  };

export const fetchUsers = async (): Promise<User[]> => {
    const response = await api.get('/users/strangers');
    return response.data;
};

export const signup = async (firstName: string, lastName: string, username: string, email: string, password: string): Promise<User> => {
  const response = await api.post('/user/signup', { username, email, password, first_name: firstName, last_name: lastName});
  return response.data;
};

export const searchUsers = async (query: string): Promise<User[]> => {
  const response = await api.get('/users/search', { params: { query: query } });
  return response.data;
};

export const getFriendStatuses = async (): Promise<FriendStatus[]> => {
  const response = await api.get('/friends/statuses');
  return response.data;
};

export const updateStatus = async (status: string, userId: number): Promise<StatusUpdateResponse> => {
  const response = await api.post('/user/statusupdate', { user_id: userId, status });
  return response.data;
};

export const sendFriendRequest = async (requestor_id: number, recipient_id: number): Promise<void> => {
  await api.post('/friend/request', { requestor_id, recipient_id});
};

export const updateFriendRequest = async (friend_request_id: number, status: string): Promise<void> => {
  await api.post('/friend/request', { friend_request_id, status });
};

export const getFriendRequests = async (userId: number): Promise<FriendRequest[]> => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/friend/requests', {
      params: {
        user_id: userId
      }
    });

    return response.data as FriendRequest[];
  } catch (error: any) {
    throw new Error(`Failed to fetch friend requests: ${error.message}`);
  }
};

export const getUserProfile = async (userId: number): Promise<UserWithStatus> => {
  try {
    const url = "http://127.0.0.1:8000/user/"+userId+"/profile"
    const response = await axios.get(url);

    return response.data as UserWithStatus;
  } catch (error: any) {
    throw new Error(`Failed to fetch friend requests: ${error.message}`);
  }
};

export const acceptFriendRequest = async (requestId: string): Promise<void> => {
  await api.post(`/friends/request/${requestId}/accept`);
};

export const rejectFriendRequest = async (requestId: string): Promise<void> => {
  await api.post(`/friends/request/${requestId}/reject`);
};