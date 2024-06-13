interface ServerStat {
  assistant_id: string;
  date: string;
  message_count: number;
  thread_count: number;
  client_message_count?: number;
  token_count?: number;
}

interface ApiResponse {
  statistics: ServerStat[];
}

export type { ServerStat, ApiResponse };
