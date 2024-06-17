"use client";
import {
  ReactNode,
  createContext,
  use,
  useContext,
} from "react";

import { fetchStatistics, fetchStatisticsWithSuspense } from "@/app/lib/data";
import {
  statsToChartData,
} from "@/app/lib/serialize/serialize";


const useChatHook = (resource: any) => {
  const data = resource.read();
  const chartStats = statsToChartData(data);

  return {
    chartStats,
  };
};

type HookReturnType = ReturnType<typeof useChatHook>;

const Context = createContext({} as HookReturnType);

export const StatsContextProvider = ({ children, resource }: { children: ReactNode, resource: any }) => {
  return <Context.Provider value={useChatHook(resource)}>{children}</Context.Provider>;
};
export const useStats = () => useContext(Context);
