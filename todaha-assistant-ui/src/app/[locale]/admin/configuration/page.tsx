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
import WebsiteUpload from "./component/website-upload";
import { useEffect } from "react";
import { useAuthContext } from "@/states/auth";


export default function Configuration ()  {
  const { isLoading, control, onSubmit } = useConfig();

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
                  <div className="w-full mb-5">
                    <label
                      htmlFor="message"
                      className=" text-base font-medium flex items-center gap-2 mb-2"
                    >
                      {t("Upload Your Website Content")}
                      <div className="tooltip" data-tip={t('upload_website_info')}>
                        <button className="btn btn-circle btn-xs">?</button>
                      </div>
                    </label>
                    
                    <WebsiteUpload />
                  </div>

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
                      className="w-full focus:border-transparent border-transparent focus:outline-0 h-12"
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
                  <div className="form-control mb-5">
                    <label
                      htmlFor="message"
                      className="block text-base font-medium"
                    >
                      {t("Initial Questions")}
                    </label>
                    <label className="message">
                      <span className="text-sm text-gray-500">
                        {t("This will be the initial questions of your chatbot")}
                      </span>
                    </label>
                    <FormInput
                      type="text"
                      control={control}
                      name={"initial_questions"}
                      placeholder={`question 1\nquestion 2\nquestion 3`}
                      className="w-full focus:border-transparent border-transparent focus:outline-0 h-24 whitespace-pre-wrap"
                      isTextArea={true}
                    />
                  </div>

                  <div>
                    <div className="mt-6 mb-5">
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

                  <div className="w-full">
                    <label
                      htmlFor="message"
                      className=" text-base font-medium flex items-center gap-2 mb-2"
                    >
                      {t("Upload")}
                      <div className="tooltip" data-tip={t('Upload info')}>
                        <button className="btn btn-circle btn-xs">?</button>
                      </div>
                    </label>
                    <FileUpload />
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
