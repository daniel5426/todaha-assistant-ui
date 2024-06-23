"use client";
import { ReactNode, createContext, useContext, useState, useEffect } from "react";

import { statsToChartData } from "@/app/lib/serialize/serialize";
import { fetchStatistics } from "../lib/data";

const useChatHook = (resource: any) => {
  const data = resource.read();
  const [chartStats1, monthly_thread1] = statsToChartData(data);
  const [ monthlyThread, setMonthlyThread] = useState<any>(monthly_thread1);
  const [ chartStats, setChartStats] = useState<any>(chartStats1);

  // Function to update stats
  const updateStats = async () => {
    try {
      const data = await fetchStatistics();
      const [chartStats1, monthlyThread1] = statsToChartData(data);
      setChartStats(chartStats1);
      setMonthlyThread(monthlyThread1);
    } catch (error) {
      console.error("Error updating stats:", error);
    }
  };

  // useEffect to run updateStats every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      updateStats();
    }, 10000); // 5000 milliseconds = 5 seconds

    // Clean up the interval on unmount or resource change
    return () => clearInterval(interval);
  }, [resource]); // Dependency array to ensure interval is cleared and reset on resource change

  return {
    chartStats,
    monthlyThread,
  };
};

type HookReturnType = ReturnType<typeof useChatHook>;

const Context = createContext({} as HookReturnType);

export const StatsContextProvider = ({ children, resource }: { children: ReactNode, resource: any }) => {
  return <Context.Provider value={useChatHook(resource)}>{children}</Context.Provider>;
};

export const useStats = () => useContext(Context);
