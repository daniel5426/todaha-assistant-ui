import { unstable_noStore as noStore } from 'next/cache';
import { FormData } from '../landing/contact/page';
import { ApiResponse, ServerStat } from './serialize/server-models';
import { IGraphDuration, IGraphStat,  } from '@/types/dashboards/chat_statistics';
import axios from 'axios';
import { daylyStats, hourlyStats, monthlyStats, processStatistics } from './serialize/serialize';
import { Server } from 'http';


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

export async function fetchStatsCardsData(assistant_id: string = 'asst_gE6RWQvul8PGsCRMJeSc2Elo') {
  noStore()
  try {
    // Call an external API endpoint to get posts
  const res = await fetch(`${api_url}/chat/count-messages?assistant_id=${assistant_id}`)
  const data = await res.json()
  console.log(data.count)
  return data.count

} catch (error) {
  console.log(error);
}

 }

 export function sendEmail(data: FormData) {
  const apiEndpoint = '/api/email';

  fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      alert(response.message);
    })
    .catch((err) => {
      alert(err);
    });
}

export async function fetchChats(assistantId: string, page: number, num_per_page: number = 7): Promise<any[]> {
  const response = await fetch(`${api_url}/chat/get-chats-history?assistant_id=${assistantId}&index=${page}&number=${num_per_page}`)

  if (!response.ok) {
      throw new Error('Failed to fetch chats');
  }

  const data = await response.json();
  return data['last-chats'];
}

export async function fetchStatistics(assistantId: string): Promise<ServerStat[]> {
  try {
      // Fetch the data from the endpoint
      const response = await axios.get<ApiResponse>(`${api_url}/chat/get-statistics?assistant_id=${assistantId}`);
      const stats = response.data.statistics;
      return stats

  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }
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
