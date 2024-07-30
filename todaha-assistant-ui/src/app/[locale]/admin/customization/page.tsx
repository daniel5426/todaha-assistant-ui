"use client";
import PageMetaData from "@/components/PageMetaData";
import {SketchPicker } from "react-color";
import dynamic from "next/dynamic";

const Chatbot = dynamic(() => import("./component/chatbot"), {
  ssr: false,
});
import { Button, Card, CardBody } from "@/components/daisyui";
import FormInput from "@/components/forms/FormInput";
import { useTranslations } from "next-intl";
import PageTitle from "@/components/PageTitle";
import { useCustomHook } from "./use-custom";
import ImageUploader from "./component/image_uploader";
import { useEffect, useState } from "react";
import ColorPicker from "./component/ColorPicker";
import ChatbotCorner from "./component/ChatbotCorner";
import { useAuthContext } from "@/states/auth";

export default function Customization() {
  const { isLoading, control, onSubmit, setValue, getValues } = useCustomHook();
  const {state, currentChatbot} = useAuthContext();
  const t = useTranslations("customization");
  const [topbarColor, setTopbarColor] = useState("");
  const [buttonColor, setButtonColor] = useState("");
  const [logo, setLogo] = useState("");
  const [topName, setTopName] = useState("");
  const [nameTextColor, setNameTextColor] = useState("");
  const [displayTopbarPicker, setDisplayTopbarPicker] = useState(false);
  const [displayButtonPicker, setDisplayButtonPicker] = useState(false);
  const [displayNameTextColorPicker, setDisplayNameTextColorPicker] = useState(false);

  useEffect(() => {
    setNameTextColor(getValues("name_text_color"));
    setTopbarColor(getValues("top_color"));
    setButtonColor(getValues("button_color"));
    setTopName(getValues("top_name"));
    setLogo(getValues("logo"));
  }, []);

  const handleTopbarColorChange = (color) => {
    setTopbarColor(color.hex);
    setValue("top_color", color.hex);
  };

  const handleButtonColorChange = (color) => {
    setButtonColor(color.hex);
    setValue("button_color", color.hex);
  };

  const handleNameTextColorChange = (color) => {
    setNameTextColor(color.hex);
    setValue("name_text_color", color.hex);
  };

  const toggleTopbarPicker = () => {
    setDisplayTopbarPicker(!displayTopbarPicker);
  };

  const toggleButtonPicker = () => {
    setDisplayButtonPicker(!displayButtonPicker);
  };

  const toggleNameTextColorPicker = () => {
    setDisplayNameTextColorPicker(!displayNameTextColorPicker);
  };


  return (
    <div>
      <PageMetaData title={t("Configuration")} />
      <PageTitle title={t("Configuration")} subMenu={t("Dashboard")} />
      <div className="mt-6">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-2 xl:col-span-3 2xl:col-span-3">
            <Card className="bg-base-100">
              <CardBody className="max-w-54">
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
                        {t(
                          "The Text that will be displayed in the top bar of the chatbot"
                        )}
                      </span>
                    </label>
                    <FormInput
                      type="text"
                      control={control}
                      name={"top_name"}
                      onChange={(e) => {
                        setTopName(e.target.value);
                        setValue("top_name", e.target.value);
                      }}
                      placeholder="your company name"
                      className="w-full focus:border-transparent border-transparent focus:outline-0 h-9"
                      bordered={false}
                      borderOffset={false}
                      isTextArea={false}
                    />
                  </div>
                  <ColorPicker
                    label="Name text color"
                    color={nameTextColor}
                    onChange={handleNameTextColorChange}
                    displayPicker={displayNameTextColorPicker}
                    togglePicker={toggleNameTextColorPicker}
                  />

                  <label
                    htmlFor="message"
                    className="block text-base font-medium"
                  >
                    {t("Choose Chatbot type")}
                  </label>

                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Modal Chatbot</span>
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio checked:bg-red-500"
                      />
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Bottom Chatbot</span>
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio checked:bg-blue-500"
                        defaultChecked
                      />
                    </label>
                  </div>

                  <ColorPicker
                    label="Topbar color"
                    color={topbarColor}
                    onChange={handleTopbarColorChange}
                    displayPicker={displayTopbarPicker}
                    togglePicker={toggleTopbarPicker}
                  />

                  <ColorPicker
                    label="Button color"
                    color={buttonColor}
                    onChange={handleButtonColorChange}
                    displayPicker={displayButtonPicker}
                    togglePicker={toggleButtonPicker}
                  />

                  <div className="form-control mb-5 mt-5">
                    <label
                      htmlFor="message"
                      className=" block text-base font-medium"
                    >
                      {t("Logo Image")}
                    </label>
                    <label className="message">
                      <span className=" text-sm text-gray-500">
                        {t(
                          "The image that will be displayed in the top bar of the chatbot"
                        )}
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
          <ChatbotCorner topName={topName} buttonColor={buttonColor} topColor={topbarColor} nameTextColor={nameTextColor} logo={logo} />
          </div>
        </div>
      </div>
    </div>
  );
}
