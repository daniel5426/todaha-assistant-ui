"use client";
import type { ApexOptions } from "apexcharts";
import { useEffect, useMemo, useState } from "react";
import ApexChart from "react-apexcharts";

import { Card, CardBody, Tab, Tabs } from "@/components/daisyui";

import { getEcommerceDashboardRevenueStatData } from "@/data/dashboards/ecommerce";
import DateUtil from "@/helpers/utils/date";
import { StringUtil } from "@/helpers/utils/string";
import { useLayoutContext } from "@/states/layout";
import { IEcommerceDashboardRevenueDuration } from "@/types/dashboards/ecommerce";
import { ILayoutThemeMode } from "@/types/layout/admin";
import { fetchAndTransformData } from "@/app/lib/data";
import {
  IGraphDuration,
  IGraphStat,
  IGraphStatSeries,
} from "@/types/dashboards/chat_statistics";

async function getOption(
  data: IGraphStatSeries[],
  theme: ILayoutThemeMode,
  duration: IGraphDuration
): Promise<ApexOptions> {
  return {
    theme: {
      mode: theme,
    },
    chart: {
      height: 380,
      type: "bar",
      stacked: true,
      // parentHeightOffset: 0,
      background: "transparent",

      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        borderRadius: 8,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        colors: {
          backgroundBarColors: ["rgba(127,127,127,0.06)"],
          backgroundBarRadius: 4,
        },
        columnWidth: "50%",
        barHeight: "100%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#3e60d5", "#3ed5b9"],
    legend: {
      show: true,
      horizontalAlign: "center",
      offsetX: 0,
      offsetY: 6,
    },
    series: [
      {
        name: "Orders",
        data: data.map((r) => r.value1),
      },
      {
        name: "Revenue",
        data: data.map((r) => r.value2),
      },
    ],
    xaxis: {
      categories: data.map((r) => r.date),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        formatter: (val) => {
          return DateUtil.formatted(new Date(val), {
            format:
              duration == "day"
                ? "DD MMM"
                : duration == "month"
                ? "MMM YY"
                : "YYYY",
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
            return "$" + StringUtil.convertToFixed(val) + "K";
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
    grid: {
      show: false,
    },
  };
}

const RevenueChart = () => {
  const [overviewDuration, setOverviewDuration] =
    useState<IGraphDuration>("hour");
  const [currentStat, setCurrentStat] = useState<IGraphStat | null>(null);
  const [fetchedData, setFetchedData] = useState<Record<
    IGraphDuration,
    IGraphStat
  > | null>(null);
  const [option, setOption] = useState<ApexOptions | null>(null);
  const { state } = useLayoutContext();

  const fetchData = async () => {
    if (!fetchedData) {
      const data = await fetchAndTransformData("asst_gE6RWQvul8PGsCRMJeSc2Elo");
      setFetchedData(data);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("loading chats");
  }, [overviewDuration, state.theme]);

  useEffect(() => {
    const async_func = async () => {
      if (!fetchedData) {
        return;
      }
      setCurrentStat(fetchedData[overviewDuration]);
      const option = await getOption(
        fetchedData[overviewDuration].series,
        state.theme,
        overviewDuration
      );
      setOption(option);
    };
    async_func();
  }, [overviewDuration, fetchedData]);

  return (
    <Card className="bg-base-100">
      <CardBody className="px-0 pb-0">
        <div className="px-6">
          <div className="flex items-center justify-between">
            <span className="font-medium">Revenue Statistics</span>
            <Tabs variant="boxed" size={"sm"}>
              <Tab
                onClick={() => setOverviewDuration("day")}
                active={overviewDuration == "day"}
              >
                Day
              </Tab>
              <Tab
                onClick={() => setOverviewDuration("month")}
                active={overviewDuration == "month"}
              >
                Month
              </Tab>
              <Tab
                onClick={() => setOverviewDuration("hour")}
                active={overviewDuration == "hour"}
              >
                Year
              </Tab>
            </Tabs>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-4xl/none font-semibold">
              $
              {currentStat && currentStat.total
                ? StringUtil.convertToCurrency(currentStat.total)
                : ""}
              K
            </span>
            <span className="text-sm font-medium text-success">
              +{currentStat ? currentStat.percent : ""}%
            </span>
          </div>
          <span className="text-sm text-base-content/70">
            Total income in this {overviewDuration}
          </span>
        </div>
        <div className="overflow-hidden rounded-xl">
          {option && (
            <ApexChart
              options={option}
              height={280}
              type={"bar"}
              series={option.series}
            ></ApexChart>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default RevenueChart;
