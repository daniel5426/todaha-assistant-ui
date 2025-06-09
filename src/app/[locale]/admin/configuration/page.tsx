"use client";
import PageMetaData from "@/components/PageMetaData";

import dynamic from "next/dynamic";

const Chatbot = dynamic(() => import("./component/chatbot"), {
  ssr: false,
});
import { Button, Card, CardBody, FileInput, Tab, Tabs } from "@/components/daisyui";
import FormInput from "@/components/forms/FormInput";
import useConfig from "./use-config";
import FileUpload from "./component/file-upload";
import { useTranslations } from "next-intl";
import PageTitle from "@/components/PageTitle";
import WebsiteUpload from "./component/website-upload";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/states/auth";


export default function Configuration ()  {
  const { isLoading, control, onSubmit } = useConfig();
  const [activeTab, setActiveTab] = useState(0);

  const  t  = useTranslations("configuration");

  return (
    <div>
      <PageMetaData title={t("Configuration")} />
      <PageTitle title={t("Configuration")} subMenu={t("Dashboard")} />
      <div className="mt-6">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5 xl:col-span-4 2xl:col-span-4">
            <Card className="bg-base-100 shadow-xl">
              <CardBody>
                <div className="mt-2">
                  <div className="bg-base-200 p-1 rounded-xl shadow-inner mb-6">
                    <Tabs className="w-full bg-transparent">
                      <Tab 
                        active={activeTab === 0} 
                        onClick={() => setActiveTab(0)}
                        className={`
                          flex-nowrap rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center px-4 py-3
                          ${activeTab === 0 
                            ? 'bg-white shadow-lg text-primary font-semibold transform scale-[1.02]' 
                            : 'bg-transparent text-base-content/70 hover:bg-base-100/50 hover:text-base-content'
                          }
                        `}
                      >
                        <div className="flex items-center justify-center flex-nowrap gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          {t("Messages")}
                        </div>
                      </Tab>
                      <Tab 
                        active={activeTab === 1} 
                        onClick={() => setActiveTab(1)}
                        className={`
                          flex-nowrap rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center px-4 py-3
                          ${activeTab === 1 
                            ? 'bg-white shadow-lg text-primary font-semibold transform scale-[1.02]' 
                            : 'bg-transparent text-base-content/70 hover:bg-base-100/50 hover:text-base-content'
                          }
                        `}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {t("Setup")}
                        </div>
                      </Tab>
                    </Tabs>
                  </div>

                    {activeTab === 0 && (
                      <div className="space-y-6">
                        <div className="form-control">
                          <label
                            htmlFor="message"
                            className="block text-base font-medium mb-3"
                          >
                            {t("First Message")}
                          </label>
                          <label className="message">
                            <span className="text-sm text-base-content/60 mb-2 block">
                              {t("This will be the welcome message of your chatbot")}
                            </span>
                          </label>
                          <FormInput
                            type="text"
                            control={control}
                            name={"welcome_message"}
                            placeholder="Hi my name is John, how can I help you today?"
                            className="w-full focus:border-transparent border-transparent focus:outline-0 h-24 bg-white shadow-sm"
                            bordered={false}
                            borderOffset={false}
                            isTextArea={true}
                          />
                        </div>

                        <div className="form-control">
                          <label
                            htmlFor="message"
                            className="block text-base font-medium mb-3"
                          >
                            {t("Initial Questions")}
                          </label>
                          <label className="message">
                            <span className="text-sm text-base-content/60 mb-2 block">
                              {t("This will be the initial questions of your chatbot")}
                            </span>
                          </label>
                          <FormInput
                            type="text"
                            control={control}
                            name={"initial_questions"}
                            placeholder={`question 1\nquestion 2\nquestion 3`}
                            className="w-full focus:border-transparent border-transparent focus:outline-0 h-24 whitespace-pre-wrap bg-white shadow-sm"
                            isTextArea={true}
                          />
                        </div>

                        <div className="form-control">
                          <label
                            htmlFor="message"
                            className="block text-base font-medium mb-3"
                          >
                            {t("Instruction")}
                          </label>
                          <label className="message">
                            <span className="text-sm text-base-content/60 mb-2 block">
                              {t("AI instruction")}
                            </span>
                          </label>
                          <FormInput
                            type="text"
                            control={control}
                            name={"instruction"}
                            placeholder="You are a sales assistant, you will answer sales related questions."
                            className="w-full focus:border-transparent border-transparent focus:outline-0 h-48 bg-white shadow-sm"
                            bordered={false}
                            borderOffset={false}
                            isTextArea={true}
                          />
                        </div>

                        <div className="pt-4">
                          <Button
                            color="primary"
                            loading={isLoading}
                            onClick={onSubmit}
                            size="sm"
                            className="gap-3 text-base shadow-lg hover:shadow-xl transition-all duration-200"
                            fullWidth
                          >
                            {t("Save")}
                          </Button>
                        </div>
                      </div>
                    )}

                    {activeTab === 1 && (
                      <div className="space-y-6">
                        <div className="w-full">
                          <label
                            htmlFor="message"
                            className="text-base font-medium flex items-center gap-2 mb-3"
                          >
                            {t("Upload Your Website Content")}
                            <div className="tooltip" data-tip={t('upload_website_info')}>
                              <button className="btn btn-circle btn-xs shadow-sm">?</button>
                            </div>
                          </label>
                          
                          <WebsiteUpload />
                        </div>

                        <div className="w-full">
                          <label
                            htmlFor="message"
                            className="text-base font-medium flex items-center gap-2 mb-3"
                          >
                            {t("Upload")}
                            <div className="tooltip" data-tip={t('Upload info')}>
                              <button className="btn btn-circle btn-xs shadow-sm">?</button>
                            </div>
                          </label>
                          <FileUpload />
                        </div>

                        <div className="pt-4">
                          <Button
                            color="primary"
                            loading={isLoading}
                            onClick={onSubmit}
                            size="sm"
                            className="gap-3 text-base shadow-lg hover:shadow-xl transition-all duration-200"
                            fullWidth
                          >
                            {t("Save")}
                          </Button>
                        </div>
                      </div>
                    )}
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
