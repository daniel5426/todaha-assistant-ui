"use client";
import FormInput from "@/components/forms/FormInput";
import { Button } from "@/components/daisyui";
import useContact from "./use-contact";
import Topbar from "../components/Topbar";
import useTranslation from "next-translate/useTranslation";

export type FormData = {
  name: string;
  email: string;
  message: string;
};

export default async function Contact() {
  const { isLoading, control, onSubmit, showPassword, toggleShowPassword } =
    useContact();
    const { t } = useTranslation("common");


  return (
    <>
      <Topbar />
      <div className="grid h-screen lg:grid-cols-3 items-center p-10 sm:grid-cols-1">
        <div className=""></div>
        <div className="flex flex-col items-stretch self-center">
          <div className="flex items-center  justify-between"></div>
          <h3 className="mt-12 text-center text-xl font-semibold lg:mt-24">
            {t("contact_h")}
          </h3>
          <h3 className="mt-2 text-center text-md text-base-content/70">
            {t("contact_b")}
          </h3>
          <div className="mt-10">
            <div>
              <div className="form-control mb-5">
                <label
                  htmlFor="name"
                  className="mb-3 block text-base font-medium"
                >
                  {t("name")}
                </label>
                <FormInput
                  type="text"
                  control={control}
                  name={"username"}
                  placeholder={t("name")}
                  className="w-full  focus:border-transparent focus:outline-0"
                  bordered={false}
                  borderOffset={false}
                />
              </div>
              <div className="form-control mb-5">
                <label
                  htmlFor="email"
                  className="mb-3 block text-base font-medium"
                >
                  {t("email")}
                </label>
                <FormInput
                  type="text"
                  control={control}
                  name={"email"}
                  placeholder={t("email")}
                  className="w-full  focus:border-transparent focus:outline-0"
                  bordered={false}
                  borderOffset={false}
                />
              </div>
              <div className="form-control mb-5">
                <label
                  htmlFor="message"
                  className="mb-3 block text-base font-medium"
                >
                  {t("biss_info")}
                </label>
                <FormInput
                  type="text"
                  control={control}
                  name={"message"}
                  placeholder={t("biss_info")}
                  className="w-full focus:border-transparent border-transparent focus:outline-0 h-28"
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
                    className="gap-3 text-base"
                    fullWidth
                  >
                    {t("send")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
