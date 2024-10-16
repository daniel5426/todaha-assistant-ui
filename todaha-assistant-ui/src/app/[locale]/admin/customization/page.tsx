"use client";
import PageMetaData from "@/components/PageMetaData";

import { Button, Card, CardBody } from "@/components/daisyui";
import FormInput from "@/components/forms/FormInput";
import { useLocale, useTranslations } from "next-intl";
import PageTitle from "@/components/PageTitle";
import { useCustomHook } from "./use-custom";
import ImageUploader from "./component/image_uploader";
import { useEffect, useState } from "react";
import ColorPicker from "./component/ColorPicker";
import ChatbotCorner from "./component/ChatbotCorner";
import ChatbotModalConfig from "./component/chatbot";

const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "he", name: "עברית" },
];

export default function Customization() {
  const locale = useLocale();
  const [selectedLanguage, setSelectedLanguage] = useState(locale as string);
  const { isLoading, control, onSubmit, setValue, getValues } = useCustomHook();
  const t = useTranslations("customization");
  const [topbarColor, setTopbarColor] = useState("");
  const [buttonColor, setButtonColor] = useState("");
  const [logo, setLogo] = useState("");
  const [topName, setTopName] = useState("");
  const [nameTextColor, setNameTextColor] = useState("");
  const [buttonTextColor, setButtonTextColor] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [displayTopbarPicker, setDisplayTopbarPicker] = useState(false);
  const [displayButtonPicker, setDisplayButtonPicker] = useState(false);
  const [displayNameTextColorPicker, setDisplayNameTextColorPicker] =
    useState(false);
  const [displayButtonTextColorPicker, setDisplayButtonTextColorPicker] =
    useState(false);
  const [displayBgColorPicker, setDisplayBgColorPicker] = useState(false);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    setNameTextColor(getValues("name_text_color"));
    setTopbarColor(getValues("top_color"));
    setButtonColor(getValues("button_color"));
    setButtonTextColor(getValues("button_text_color"));
    setButtonText(getValues("button_text"));
    setTopName(getValues("top_name"));
    setBgColor(getValues("bg_color"));
    setLogo(getValues("logo"));
    setSelectedLanguage(getValues("lg"));
    setIsModal(getValues("is_modal"));
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

  const handleButtonTextColorChange = (color) => {
    setButtonTextColor(color.hex);
    setValue("button_text_color", color.hex);
  };

  const handleBgColorChange = (color) => {
    setBgColor(color.hex);
    setValue("bg_color", color.hex);
  };

  const toggleButtonTextColorPicker = () => {
    setDisplayButtonTextColorPicker(!displayButtonTextColorPicker);
  };

  const toggleTopbarPicker = () => {
    setDisplayTopbarPicker(!displayTopbarPicker);
  };

  const toggleButtonPicker = () => {
    setDisplayButtonPicker(!displayButtonPicker);
  };

  const toggleBgColorPicker = () => {
    setDisplayBgColorPicker(!displayBgColorPicker);
  };

  const toggleNameTextColorPicker = () => {
    setDisplayNameTextColorPicker(!displayNameTextColorPicker);
  };

  const handleLogoChange = (newLogo: string) => {
    setLogo(newLogo);
    setValue("logo", newLogo);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
    setValue("lg", e.target.value);
  };

  return (
    <div>
      <PageMetaData title={t("Configuration")} />
      <PageTitle title={t("Configuration")} subMenu={t("Dashboard")} />
      <div className="mt-6">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5 xl:col-span-5 2xl:col-span-3">
            <Card className="bg-base-100 w-[400px]">
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
                  <div className="flex items-center justify-between mt-5">
                    <div className="flex-1">
                      <label
                        htmlFor="message"
                        className="block text-base font-medium  pb-2"
                      >
                        {t("The text on the button")}
                      </label>
                      <FormInput
                        type="text"
                        control={control}
                        name={"button_text"}
                        onChange={(e) => {
                          setButtonText(e.target.value);
                          setValue("button_text", e.target.value);
                        }}
                        placeholder="Ask AI"
                        className="w-full focus:border-transparent border-transparent focus:outline-0 h-9"
                        bordered={false}
                        borderOffset={false}
                        isTextArea={false}
                      />
                    </div>
                    <div className="divider divider-horizontal mx-2"></div>
                    <div className="flex-1">
                      <div className="form-control">
                        <label
                          htmlFor="language"
                          className="block text-base font-medium pb-2"
                        >
                          {t("Language")}
                        </label>
                        <select
                          id="language"
                          value={selectedLanguage}
                          onChange={handleLanguageChange}
                          className="select select-sm select-bordered w-full mt-1"
                        >
                          {languages.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                              {lang.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="divider"></div>
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <label
                        htmlFor="message"
                        className="block text-base font-medium mb-2"
                      >
                        {t("Choose your chatbot type")}
                      </label>

                      <div className="form-control flex flex-row items-center">
                        <label className="label cursor-pointer">
                          <span className="label-text">{t("Modal")}</span>
                          <div className="p-2"></div>
                          <input
                            type="radio"
                            name="chatbot-type"
                            className="radio checked:bg-red-500"
                            value="modal"
                            checked={isModal}
                            onChange={() => {
                              setIsModal(true);
                              setValue("is_modal", true);
                            }}
                          />
                        </label>
                        <div className="p-3"></div>
                        <label className="label cursor-pointer">
                          <span className="label-text">{t("Default")}</span>
                          <div className="p-2"></div>
                          <input
                            type="radio"
                            name="chatbot-type"
                            className="radio checked:bg-blue-500"
                            value="bottom"
                            checked={!isModal}
                            onChange={() => {
                              setIsModal(false);
                              setValue("is_modal", false);
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="divider divider-horizontal mx-4"></div>

                    <div className="flex-1">
                      <ColorPicker
                        label="Top text color"
                        color={nameTextColor}
                        onChange={handleNameTextColorChange}
                        displayPicker={displayNameTextColorPicker}
                        togglePicker={toggleNameTextColorPicker}
                      />
                    </div>
                  </div>

                  <div className="divider"></div>
                  <div className="flex justify-between w-full">
                    <ColorPicker
                      label="Topbar color"
                      color={topbarColor}
                      onChange={handleTopbarColorChange}
                      displayPicker={displayTopbarPicker}
                      togglePicker={toggleTopbarPicker}
                    />
                    <div className="divider lg:divider-horizontal"></div>
                    <ColorPicker
                      label="Button color"
                      color={buttonColor}
                      onChange={handleButtonColorChange}
                      displayPicker={displayButtonPicker}
                      togglePicker={toggleButtonPicker}
                    />
                  </div>
                  <div className="divider"></div>
                  <div className="flex justify-between w-full mt-5">
                    <ColorPicker
                      label="Button text color"
                      color={buttonTextColor}
                      onChange={handleButtonTextColorChange}
                      displayPicker={displayButtonTextColorPicker}
                      togglePicker={toggleButtonTextColorPicker}
                    />
                    <div className="divider lg:divider-horizontal"></div>
                    <ColorPicker
                      label="Background color"
                      color={bgColor}
                      onChange={handleBgColorChange}
                      displayPicker={displayBgColorPicker}
                      togglePicker={toggleBgColorPicker}
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
                        {t(
                          "The image that will be displayed in the top bar of the chatbot"
                        )}
                      </span>
                    </label>
                    <div className=" flex justify-center">
                      <ImageUploader
                        onLogoChange={handleLogoChange}
                        initialLogo={logo}
                      />
                    </div>
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
          <div className="lg:col-span-7 xl:col-span-7 2xl:col-span-9 flex justify-center top-14">
            {isModal ? (
              <ChatbotModalConfig
                logo={logo}
                lg={selectedLanguage}
                bgColor={bgColor}
                buttonColor={buttonColor}
                buttonText={buttonText}
                buttonTextColor={buttonTextColor}
              />
            ) : (
              <ChatbotCorner
                topName={topName}
                bgColor={bgColor}
                buttonColor={buttonColor}
                selectedLanguage={selectedLanguage}
                topColor={topbarColor}
                nameTextColor={nameTextColor}
                buttonTextColor={buttonTextColor}
                buttonText={buttonText}
                logo={logo}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
