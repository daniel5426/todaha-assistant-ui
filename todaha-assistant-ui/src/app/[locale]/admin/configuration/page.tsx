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
import { useAuthContext } from "@/states/auth";
import { useTranslations } from "next-intl";

const Configuration = () => {
  const { isLoading, control, onSubmit } = useConfig();
  const { state } = useAuthContext();
  const  t  = useTranslations("configuration");

  return (
    <>
      <PageMetaData title={"Chat"} />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-9">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{t("Configuration")}</h3>
          </div>
        </div>
      </div>
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
    </>
  );
};

export default Configuration;
