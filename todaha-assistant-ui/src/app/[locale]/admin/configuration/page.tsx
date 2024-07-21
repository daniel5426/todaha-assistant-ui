"use client";
import PageMetaData from "@/components/PageMetaData";

import dynamic from "next/dynamic";

const Chatbot = dynamic(() => import("./component/chatbot"), {
  ssr: false,
});
import { Button, Card, CardBody, FileInput } from "@/components/daisyui";
import FormInput from "@/components/forms/FormInput";
import useConfig from "./use-config";
import FileUpload from "./component/file-upload";
import { useTranslations } from "next-intl";
import PageTitle from "@/components/PageTitle";
import { Suspense } from "react";
import { DashboardCounterWidget } from "../components/CounterWidget";
import { RevenueChartAndCardSkeleton } from "../components/loading";
import RevenueChart from "../components/RevenueChart";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const getOption = (
): ApexOptions => {
  return {
    theme: {
      mode: "light",},
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
        name: "Messages",
        data: [],
      },
    ],
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
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


export default function Configuration ()  {
  const { isLoading, control, onSubmit } = useConfig();
  const  t  = useTranslations("configuration");
  const options = getOption();

  return (
    <div>
                  <ReactApexChart
            options={options}
            height={0}
            type={"bar"}
            series={options.series}
          ></ReactApexChart>
      <PageMetaData title={t("Configuration")} />
      <PageTitle title={t("Configuration")} subMenu={t("Dashboard")} />
      <div className="mt-6">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5 xl:col-span-4 2xl:col-span-4">
            <Card className="bg-base-100">
              <CardBody>
                <div className="mt-2">
                  <div className="form-control mb-5">
                    <label
                      htmlFor="message"
                      className="block text-base font-medium"
                    >
                      {t("First Message")}
                    </label>
                    <label className="message">
                      <span className="text-sm text-gray-500">
                        {t("This will be the welcome message of your chatbot")}
                      </span>
                    </label>
                    <FormInput
                      type="text"
                      control={control}
                      name={"welcome_message"}
                      placeholder="Hi my name is John, how can I help you today?"
                      className="w-full focus:border-transparent border-transparent focus:outline-0 h-18"
                      bordered={false}
                      borderOffset={false}
                      isTextArea={true}
                    />
                  </div>

                  <div className="form-control mb-5 mt-5">
                    <label
                      htmlFor="message"
                      className=" block text-base font-medium"
                    >
                      {t("Instruction")}
                    </label>
                    <label className="message">
                      <span className=" text-sm text-gray-500">
                        {t("AI instruction")}
                      </span>
                    </label>
                    <FormInput
                      type="text"
                      control={control}
                      name={"instruction"}
                      placeholder="You are a sales assistant, you will answer sales related questions."
                      className=" w-full focus:border-transparent border-transparent focus:outline-0 h-48"
                      bordered={false}
                      borderOffset={false}
                      isTextArea={true}
                    />
                  </div>
                  <div>
                    <div className="mt-6">
                      <Button
                        color="primary"
                        loading={isLoading}
                        onClick={onSubmit}
                        size="sm"
                        className="gap-3 text-base"
                        fullWidth
                      >
                        {t("Save")}
                      </Button>
                    </div>
                  </div>

                  <div className=" w-full mt-5">
                    <label
                      htmlFor="message"
                      className=" block text-base font-medium"
                    >
                      {t("Upload")}
                    </label>
                    <span className="text-sm text-gray-500 mb-3">
                      {t('Upload info')}</span>

                    <FileUpload />
                  </div>
                </div>
                <div className="mt-2 text-center"></div>
              </CardBody>
            </Card>

          </div>
          <div className="lg:col-span-7 xl:col-span-8 2xl:col-span-8 flex justify-center top-14">
            <Chatbot />
          </div>
        </div>
      </div>
    </div>
  );
};