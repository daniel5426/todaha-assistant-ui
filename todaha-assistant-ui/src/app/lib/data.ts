import { unstable_noStore as noStore } from 'next/cache';
import { FormData } from '../landing/contact/page';
import { ApiResponse } from './serialize/server-models';
import { IGraphDuration, IGraphStat,  } from '@/types/dashboards/chat_statistics';
import axios from 'axios';
import { calculateDailyStats, calculateHourlyStats, calculateMonthlyStats } from './serialize/serialize';


const api_url = process.env.NEXT_PUBLIC_API_BASE_URL1;
const num_per_page = 7;

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

export async function fetchChats(assistantId: string, page: number): Promise<any[]> {
  const response = await fetch(`${api_url}/chat/get-chats-history?assistant_id=${assistantId}&index=${page}&number=${num_per_page}`)

  if (!response.ok) {
      throw new Error('Failed to fetch chats');
  }

  const data = await response.json();
  return data['last-chats'];
}

export async function fetchAndTransformData(assistantId: string): Promise<Record<IGraphDuration, IGraphStat>> {
  try {
      // Fetch the data from the endpoint
      const response = await axios.get<ApiResponse>(`${api_url}/chat/get-statistics?assistant_id=${assistantId}`);
      const stats = response.data.statistics;

      // Process the data to calculate hourly, daily, monthly, and yearly stats
      const hourlyData = await calculateHourlyStats(stats);
      const dailyData = await calculateDailyStats(stats);
      const monthlyData = await calculateMonthlyStats(stats);

      // Construct the final result
      const result: Record<IGraphDuration, IGraphStat> = {
          hour: hourlyData,
          day: dailyData,
          month: monthlyData,
      };

      return result;

  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }
}


