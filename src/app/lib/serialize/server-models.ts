interface ServerStat {
  assistant_id: string;
  date: string;
  thread_count: number;
  client_message_count?: number;
  token_count?: number;
}

interface DashboardChartStats {
  thread_count: number;
  client_message_count: number;
}


interface ApiResponse {
  statistics: ServerStat[];
}

export type { ServerStat, ApiResponse, DashboardChartStats };
