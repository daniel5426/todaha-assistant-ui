"use client";
import { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { StatsContextProvider, useStats } from './use-stats';
import { fetchStatisticsWithSuspense } from "../../../lib/data";

function WaitComponent({ children }: { children: React.ReactNode }) {
  const {chartStats} = useStats();
  if (!chartStats) {
    return <div><h1>loading...</h1></div>;
  }
  return children;
}


export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div>
      <Suspense fallback={<div><h1>Loading...</h1></div>}>
        
          <StatsContextProvider>
            <WaitComponent>
              {children}
            </WaitComponent>
          </StatsContextProvider>
        
      </Suspense>
    </div>
  );
}