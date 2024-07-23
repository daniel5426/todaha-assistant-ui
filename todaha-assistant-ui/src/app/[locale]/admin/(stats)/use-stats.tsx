"use client";
import { ReactNode, createContext, useContext, useState, useEffect } from "react";

import { statsToChartData } from "@/app/lib/serialize/serialize";
import { fetchStatistics, fetchStatisticsWithSuspense } from "../../../lib/data";

const useChatHook = () => {
  const [ monthlyThread, setMonthlyThread] = useState<any>(null);
  const [ chartStats, setChartStats] = useState<any>(null);
  const [ tokenCount, setTokenCount] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  // Function to update stats
  const updateStats = async () => {
    setLoading(true);
    try {
      const data2 = await fetchStatistics();
      const [chartStats1, monthlyThread1, tokenCount] = statsToChartData(data2);
      setChartStats(chartStats1);
      setMonthlyThread(monthlyThread1);
      setTokenCount(tokenCount);
    } catch (error) {
      console.error("Error updating stats:", error);
    }
    setLoading(false);
  };


  // useEffect to run updateStats every 5 seconds
  useEffect(() => {
    updateStats();
    const interval = setInterval(() => {
      updateStats();
    }, 5000); // 5000 milliseconds = 5 seconds

    // Clean up the interval on unmount or resource change
    return () => clearInterval(interval);
  }, []); // Dependency array to ensure interval is cleared and reset on resource change

  return {
    chartStats,
    monthlyThread,
    tokenCount, 
    loading,
  };
};

type HookReturnType = ReturnType<typeof useChatHook>;

const Context = createContext({} as HookReturnType);

export const StatsContextProvider = ({ children }: { children: ReactNode}) => {
  return <Context.Provider value={useChatHook()}>{children}</Context.Provider>;
};

export const useStats = () => useContext(Context);
