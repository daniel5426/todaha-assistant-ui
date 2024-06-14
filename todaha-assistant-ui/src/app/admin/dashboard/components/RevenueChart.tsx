import type { ApexOptions } from "apexcharts";
import { useEffect, useMemo, useState } from "react";
import ReactApexChart from "react-apexcharts";

import { Card, CardBody, Tab, Tabs } from "@/components/daisyui";

import { getEcommerceDashboardRevenueStatData } from "@/data/dashboards/ecommerce";
import DateUtil from "@/helpers/utils/date";
import { StringUtil } from "@/helpers/utils/string";
import { useLayoutContext } from "@/states/layout";
import { IEcommerceDashboardRevenueDuration } from "@/types/dashboards/ecommerce";
import { ILayoutThemeMode } from "@/types/layout/admin";
import { fetchAndTransformData } from "@/app/lib/data";
import { IGraphDuration, IGraphStat } from "@/types/dashboards/chat_statistics";

const getOption = (
  dataF: Record<IGraphDuration, IGraphStat>,
  duration: IGraphDuration = "hour",
  theme: ILayoutThemeMode
): ApexOptions => {
  const data = dataF[duration].series;
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
        name: "Chats",
        data: data.map((r) => r.value1),
      },
      {
        name: "Messages",
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
                ? "MMM"
                : "H",
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
    grid: {
      show: false,
    },
  };
};

export default function RevenueChart() {
  const [overviewDuration, setOverviewDuration] = useState<IGraphDuration>("hour");
  const [flag, setFlag] = useState<boolean>(true);
  const [data, setData] = useState<Record<IGraphDuration, IGraphStat>>({
    day: {
      total: 0,
      percent: 2.14,
      series: [],
    },
    month: {
      total: 0,
      percent: 4.59,
      series: [],
    },
    hour: {
      total: 0,
      percent: 3.24,
      series: [],
    },
  });
  const { state } = useLayoutContext();

  const [options, setOptions] = useState<ApexOptions>(getOption(data, overviewDuration, state.theme) );



  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchAndTransformData(
          "asst_gE6RWQvul8PGsCRMJeSc2Elo"
        );
        setData(fetchedData);
        setFlag(false);
        console.log("fetchedData", fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setOptions( getOption(data, overviewDuration, state.theme));
  }, [overviewDuration, state.theme, flag]);

  const currentStat = useMemo(() => {
    return data[overviewDuration];
  }, [overviewDuration, flag]);

  return (
    <Card className="bg-base-100">
      <CardBody className="px-0 pb-0">
        <div className="px-6">
          <div className="flex items-center justify-between">
            <span className="font-medium">AI Assistant - clients usage statistics</span>
            <Tabs variant="boxed" size={"sm"}>
              <Tab
                onClick={() => setOverviewDuration("hour")}
                active={overviewDuration == "hour"}
              >
                Today
              </Tab>
              <Tab
                onClick={() => setOverviewDuration("day")}
                active={overviewDuration == "day"}
              >
                This week
              </Tab>
              <Tab
                onClick={() => setOverviewDuration("month")}
                active={overviewDuration == "month"}
              >
                Last 5 months
              </Tab>
            </Tabs>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-3xl/none font-semibold">
              {StringUtil.convertToCurrency(currentStat.total)} question asked
            </span>
            <span className="text-sm font-medium text-success">
              +{currentStat.percent}%
            </span>
          </div>
          <span className="text-sm text-base-content/70">
            Total number of responce 
          </span>
        </div>
        <div className="overflow-hidden rounded-xl">
          <ReactApexChart
            options={options}
            height={280}
            type={"bar"}
            series={options.series}
          ></ReactApexChart>
        </div>
      </CardBody>
    </Card>
  );
}
