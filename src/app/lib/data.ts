'use client'
import { ApiResponse, ServerStat } from './serialize/server-models';
import { IAuthUser, Token } from '@/types/auth';
import axiosInstance from './axiosConfig';
import Cookies from "js-cookie";

const api_url = process.env.NEXT_PUBLIC_API_BASE_URL1

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

export const fetchWithInterceptor = async (url: string , options: any = {}) => {
  const token = Cookies.get('token');
  const headers = {
    ...options?.headers,
    // Example: Add Authorization header with bearer token
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  const fetchOptions = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // or response.text() or response.blob(), etc.
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
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

export async function fetchChats(page: number, num_per_page: number = 7): Promise<any> {
  const response = await axiosInstance.get(`/admin/get-chats-history?index=${page}&number=${num_per_page}`)

  if (!response.data) {
      throw new Error('Failed to fetch chats');
  }

  const data = response.data;
  return {last_chat: data['last-chats'], total_chats: data['total-chats']};
}

export async function fetchChat(page: number, num_per_page: number = 7): Promise<any[]> {
  // Retrieve the token from cookies
  const token = Cookies.get('token');
  
  // Construct the fetch request
  const response = await fetch(`${api_url}/admin/get-chats-history?index=${page}&number=${num_per_page}`, {
    method: 'GET', // HTTP method (GET, POST, etc.)
    headers: {
      'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      'Content-Type': 'application/json', // Example of other headers
      // Add other headers as needed
    },
  });

  // Check if the response is OK
  if (!response.ok) {
    throw new Error('Failed to fetch chats');
  }

  // Parse and return the response data
  const data = await response.json();
  return data['last-chats'];
}



export async function fetchStatistics(): Promise<ServerStat[]> {
  // Fetch the data from the endpoint
const response = await axiosInstance.get<ApiResponse>(`/admin/get-statistics`);
const stats = response.data.statistics;
return stats
}

export async function uploadFile(formData: any): Promise<any> {
  const response = await axiosInstance.post(`/admin/ai/upload-file`, formData, {
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

export async function createPortalSession(customerId: string) {
  const response = await axiosInstance.get('/stripe/create-portal-session');
  return response.data;
}

export async function createCheckoutSession(priceId: string) {
  const response = await axiosInstance.get('/stripe/create-checkout-session', {
    params: { price_id: priceId }
  });
  return response.data;
}

export async function uploadWebsiteUrl(
  websiteUrl: string, 
  maxPages: number = 200,
  crawlConfig?: {
    parallelRequests?: number;
    qualityThreshold?: number;
    includeSubdomains?: boolean;
    respectRobots?: boolean;
    specificPages?: string[];
  }
) {
  let params = `?website_url=${encodeURIComponent(websiteUrl)}&max_pages=${maxPages}`;
  
  if (crawlConfig) {
    if (crawlConfig.parallelRequests) {
      params += `&parallel_requests=${crawlConfig.parallelRequests}`;
    }
    if (crawlConfig.qualityThreshold !== undefined) {
      params += `&quality_threshold=${crawlConfig.qualityThreshold}`;
    }
    if (crawlConfig.includeSubdomains !== undefined) {
      params += `&include_subdomains=${crawlConfig.includeSubdomains}`;
    }
    if (crawlConfig.respectRobots !== undefined) {
      params += `&respect_robots=${crawlConfig.respectRobots}`;
    }
    if (crawlConfig.specificPages && crawlConfig.specificPages.length > 0) {
      params += `&specific_pages=${encodeURIComponent(JSON.stringify(crawlConfig.specificPages))}`;
    }
  }
  
  const response = await axiosInstance.post(`/admin/ai/upload-website${params}`);
  return response;
}

export async function uploadIndividualPages(
  pageUrls: string[],
  qualityThreshold: number = 10,
  respectRobots: boolean = true
) {
  const params = `?page_urls=${encodeURIComponent(JSON.stringify(pageUrls))}&quality_threshold=${qualityThreshold}&respect_robots=${respectRobots}`;
  const response = await axiosInstance.post(`/admin/ai/upload-individual-pages${params}`);
  return response;
}

export async function deleteIndividualPage(pageUrl: string) {
  const params = `?page_url=${encodeURIComponent(pageUrl)}`;
  const response = await axiosInstance.post(`/admin/ai/delete-individual-page${params}`);
  return response;
}

export async function deleteWebsiteUrl() {
  const response = await axiosInstance.post('/admin/ai/delete-website');
  return response;
}

export async function updateChatbot(data: any) {
  const response = await axiosInstance.post('/admin/ai/update-chatbot', data);
  return response.data;
}

export async function deleteFile(file_id: any) {
  const response = await axiosInstance.post(`/admin/ai/delete-file?file_id=${file_id}`);
  return response;
}


export async function register(data: any): Promise<any> {
    const response = await axiosInstance.post(`/auth/register`, data);
    if (response.status === 400) {
        return response;
    }
    const user = response.data;
    return user
}

export function get_token(data: any): Promise<Token> {
  return axiosInstance.post(`/auth/token`, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(response => response.data);
}

export async function get_user_info(): Promise<IAuthUser> {
  const response = await axiosInstance.get(`/auth/users/me`);
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
