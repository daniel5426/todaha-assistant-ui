import { unstable_noStore as noStore } from 'next/cache';
import { ApiResponse, ServerStat } from './serialize/server-models';
import { IGraphDuration, IGraphStat,  } from '@/types/dashboards/chat_statistics';
import axios from 'axios';
import { IAuthUser, Token } from '@/types/auth';
import httpRequest from '@/services/api/request';
import axiosInstance from './axiosConfig';


const api_url = process.env.NEXT_PUBLIC_API_BASE_URL1;

const wrapPromise = (promise: Promise<any>) => {
  let status = 'pending';
  let result: any;
  let suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e;
    }
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    },
  };
};

 export async function sendEmail(data: any) {
  const apiEndpoint = '/api/mail';

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result.message;
}

export async function fetchChats(page: number, num_per_page: number = 7): Promise<any[]> {
  const response = await axiosInstance.get(`/admin/get-chats-history?index=${page}&number=${num_per_page}`)

  if (!response.data) {
      throw new Error('Failed to fetch chats');
  }

  const data = response.data;
  return data['last-chats'];
}

export async function fetchStatistics(): Promise<ServerStat[]> {
      // Fetch the data from the endpoint
    const response = await axiosInstance.get<ApiResponse>(`/admin/get-statistics`);
    const stats = response.data.statistics;
    return stats
}

export async function uploadFile(formData: any, fileId: string): Promise<any> {
  const response = await axiosInstance.post(`/admin/ai/upload-file?old_file_id=${fileId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
  }

export async function updateAiConfiguration(data: any) {
  const response = await axiosInstance.post('/admin/ai/configure', data);
  return response.data;
}


export async function register(data: any): Promise<any> {
    const response = await axiosInstance.post(`/auth/register`, data);
    console.log(response);
    if (response.status === 400) {
        return response;
    }
    const user = response.data;
    return user
}

export async function get_token(data: any): Promise<Token> {
  console.log(data);
  const response = await axiosInstance.post(`/auth/token`, data, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});
  console.log(response);
  return  response.data;
}

export async function get_user_info(data: any): Promise<IAuthUser> {
  const response = await axiosInstance.get(`/auth/users/me`, data);
  return  response.data;
}



const createSuspenseFetcher = (fetchFunction: (...args: any[]) => Promise<any>) => {
  let cache: { [key: string]: any } = {}; // Add index signature to cache object

  return (...args: any) => {
    const key = JSON.stringify(args); // Generate a cache key based on arguments

    if (!cache[key]) {
      // If data is not in cache, fetch it
      cache[key] = wrapPromise(fetchFunction(...args));
    }

    return cache[key];
  };
};


export const fetchChatsWithSuspense = createSuspenseFetcher(fetchChats);

export const fetchStatisticsWithSuspense = createSuspenseFetcher(fetchStatistics);
