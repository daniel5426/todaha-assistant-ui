"use client";
import arrowDownIcon from "@iconify/icons-lucide/arrow-down";
import arrowUpIcon from "@iconify/icons-lucide/arrow-up";

import type { ApexOptions } from "apexcharts";
import { useMemo } from "react";
import ApexChart from "react-apexcharts";

import { Card, CardBody, Tab, Tabs } from "@/components/daisyui";

import Icon from "@/components/Icon";
import { getEcommerceDashboardUserInteractionData } from "@/data/dashboards/ecommerce";
import { useLayoutContext } from "@/states/layout";
import { IEcommerceDashboardUserInteraction } from "@/types/dashboards/ecommerce";
import { useStats } from "../use-stats";
import DateUtil from "@/helpers/utils/date";
import { StringUtil } from "@/helpers/utils/string";
import { ILayoutThemeMode } from "@/types/layout/admin";

const getOption = (
data: any, isValue1: boolean, theme: ILayoutThemeMode): ApexOptions => {
  return {
    theme: {
      mode: theme,
    },
    chart: {
      height: 370,
      type: "area",
      background: "transparent",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },

    stroke: {
      curve: ["smooth", "straight"],
      width: 2,
      dashArray: [0, 6],
    },
    series: [
      {
        name: isValue1?"Conversation":"Messages",
        type: "area",
        data: data.map((r: {
          value2: any; value1: any 
}) => isValue1?r.value1:r.value2),
      },
    ],
    xaxis: {
      categories: data.map((r: { date: any }) => r.date),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        formatter: (val) => {
          return DateUtil.formatted(new Date(val), {
            format: "DD MMM",
          });
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val, e) {
          if (e) {
            if (e.seriesIndex == 0) {
              return val.toString();
            }
            return StringUtil.convertToFixed(val);
          }
          return val.toString();
        },
      },
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
    },  
    legend: {
      show: true,
      horizontalAlign: "center",
      offsetX: 0,
      offsetY: 6,
    },  

    fill: {
      type: "gradient",
      opacity: 1,
      gradient: {
        shadeIntensity: 1,

        type: "horizontal",
        colorStops: [
          {
            offset: 0,
            color: "rgba(75,134,255,0.1)",
            opacity: 1,
          },
          {
            offset: 30,
            color: "rgba(255,54,54,0.1)",
            opacity: 1,
          },
          {
            offset: 35,
            color: "rgba(255,54,138,0.08)",
            opacity: 1,
          },
          {
            offset: 50,
            color: "rgba(51,84,250,0.2)",
            opacity: 1,
          },
          {
            offset: 80,
            color: "rgba(64,96,255,0.16)",
            opacity: 1,
          },
          {
            offset: 100,
            color: "rgba(75,99,255,0.1)",
            opacity: 1,
          },
        ],
      },
    },
  };
};

export function ThreadChart ()  {
  const { chartStats, monthly_thread } = useStats();
  const thread_series = monthly_thread.series;

  const { state } = useLayoutContext();

  const options: ApexOptions = useMemo(() => {
    return getOption(thread_series, true, state.theme);
  }, [state.theme]);

  return (
    <Card className="bg-base-100">
      <CardBody className="px-0 pb-0">
        <div className="px-6">
          <div className="flex items-center justify-between">
            <span className="font-medium">
            AI Assistant - users interaction 
            </span>
            <Tabs variant="boxed" size={"md"}>
              <Tab active={true}
              >
                Last 30 days
              </Tab>
              </Tabs>
          </div>
          <div className="mt-2 border-y border-base-content/10  py-2">
          <div className="mt-2 flex items-center gap-3">
            <span className="text-3xl/none font-semibold">
              {StringUtil.convertToCurrency(monthly_thread.total2)} messages
            </span>
          </div>
          <span className="text-sm text-base-content/70">
            Total number of messages in the last 30 days
          </span>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl">
          <ApexChart
            options={options}
            height={310}
            type={"area"}
            series={options.series}
          ></ApexChart>
        </div>
      </CardBody>
    </Card>
  );
};

export function MessagesChart ()  {
  const { chartStats, monthly_thread } = useStats();
  const thread_series = monthly_thread.series;

  const { state } = useLayoutContext();

  const options: ApexOptions = useMemo(() => {
    return getOption(thread_series, false, state.theme);
  }, [state.theme]);

  return (
    <Card className="bg-base-100">
      <CardBody className="px-0 pb-0">
        <div className="px-6">
          <div className="flex items-center justify-between">
            <span className="font-medium">
              AI Assistant - users interaction 
            </span>
            <Tabs variant="boxed" size={"md"}>
              <Tab active={true}
              >
                Last 30 days
              </Tab>
              </Tabs>
          </div>
          <div className="mt-2 border-y border-base-content/10  py-2">
          <div className="mt-2 flex items-center gap-3">
            <span className="text-3xl/none font-semibold">
              {StringUtil.convertToCurrency(monthly_thread.total1)} conversations
            </span>
          </div>
          <span className="text-sm text-base-content/70">
            Total number of conversations in the last 30 days
          </span>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl">
          <ApexChart
            options={options}
            height={310}
            type={"area"}
            series={options.series}
          ></ApexChart>
        </div>
      </CardBody>
    </Card>
  );
};