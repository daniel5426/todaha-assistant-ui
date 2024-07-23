"use client";
import PageMetaData from "@/components/PageMetaData";

import dynamic from "next/dynamic";

const Chatbot = dynamic(() => import("./component/chatbot"), {
  ssr: false,
});
import { Button, Card, CardBody, FileInput } from "@/components/daisyui";
import FormInput from "@/components/forms/FormInput";
import useConfig from "./use-custom";
import FileUpload from "./component/file-upload";
import { useTranslations } from "next-intl";
import PageTitle from "@/components/PageTitle";
import { Suspense } from "react";
import { DashboardCounterWidget } from "../components/CounterWidget";
import { RevenueChartAndCardSkeleton } from "../components/loading";
import RevenueChart from "../components/RevenueChart";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import useCustom from "./use-custom";
import ImageUploader from "./component/image_uploader";


export default function Configuration ()  {
  const { isLoading, control, onSubmit } = useCustom();
  const  t  = useTranslations("configuration");

  return (
    <div>
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
                      {t("Top bar text")}
                    </label>
                    <label className="message">
                      <span className="text-sm text-gray-500">
                        {t("The Text that will be displayed in the top bar of the chatbot")}
                      </span>
                    </label>
                    <FormInput
                      type="text"
                      control={control}
                      name={"top_name"}
                      placeholder="your company name"
                      className="w-full focus:border-transparent border-transparent focus:outline-0 h-9"
                      bordered={false}
                      borderOffset={false}
                      isTextArea={false}
                    />
                  </div>

                  <div className="form-control mb-5 mt-5">
                    <label
                      htmlFor="message"
                      className=" block text-base font-medium"
                    >
                      {t("Logo Image")}
                    </label>
                    <label className="message">
                      <span className=" text-sm text-gray-500">
                        {t("The image that will be displayed in the top bar of the chatbot")}
                      </span>
                    </label>
                    <ImageUploader />
                  </div>
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