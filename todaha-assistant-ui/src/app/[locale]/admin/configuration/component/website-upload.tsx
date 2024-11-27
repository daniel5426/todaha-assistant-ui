"use client";
import { deleteWebsiteUrl, uploadWebsiteUrl } from "@/app/lib/data";
import { Input } from "@/components/daisyui";
import useToast from "@/hooks/use-toast";
import { useAuthContext } from "@/states/auth";
import React, { useState, useEffect } from "react";
import Icon from "@/components/Icon";
import TrashIcon from "@iconify/icons-lucide/trash";
import { useTranslations } from "next-intl";

const WebsiteUpload = () => {
  const t = useTranslations("configuration");
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [existingWebsiteUrl, setExistingWebsiteUrl] = useState<string>("");
  const { updateUserInfo, state } = useAuthContext();
  const { toaster } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");

  useEffect(() => {
    setExistingWebsiteUrl(state.user?.assistant.website_url);
  }, [state.user?.assistant.website_url]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      let toggle = false;
      interval = setInterval(() => {
        setLoadingMessage(toggle ? t("download_website_pages") : t("upload_pages_to_ai"));
        toggle = !toggle;
      }, 2000); // Switch every 2 seconds
    } else {
      setLoadingMessage("");
    }
    return () => clearInterval(interval);
  }, [isLoading, t]);

  const handleUpload = async () => {
    if (websiteUrl === "") {
      toaster.error("No URL provided");
      return;
    }
    if (state.user?.assistant.website_url !== "") {
      toaster.error("URL already uploaded");
      return;
    }
    setIsLoading(true);
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    if (!urlPattern.test(websiteUrl)) {
      toaster.error("Invalid URL");
      setIsLoading(false);
      return;
    }

    try {
      const response = await uploadWebsiteUrl(websiteUrl);
      if (response.status === 200) {
        await updateUserInfo();
        toaster.success("Website uploaded successfully");
        // Refresh the files after upload
        setWebsiteUrl("");
      } else {
        toaster.error("Failed to upload website");
      }
    } catch (error) {
      toaster.error("Error uploading website");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
        await deleteWebsiteUrl();
      
      await updateUserInfo();
      toaster.success("Website deleted successfully");
      // Update files state to remove the deleted file
      setWebsiteUrl("");
    } catch (error) {
      toaster.error("Error deleting website");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <Input
          className="w-full"
          type="text"
          value={websiteUrl}
          size="sm"
          onChange={(e) => setWebsiteUrl(e.target.value)}
          placeholder="https://www.example.com"
        />
        <button
          className="btn btn-primary min-w-[100px] btn-sm"
          onClick={handleUpload}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading loading-bars loading-xs"></span>
              <span>{t("Loading")}</span>
            </>
          ) : (
            "Upload"
          )}
        </button>
      </div>

      {isLoading && (
        <div className="text-sm text-gray-500 mt-2 flex items-center gap-2 px-1">
          <span className="loading loading-dots loading-xs"></span>
          {loadingMessage}
        </div>
      )}

      {existingWebsiteUrl !== "" && (
        <div className="pt-2">
          <div className="flex w-full">
            <button className="btn btn-sm flex-1 rounded-r-none truncate border-r-0">
              {existingWebsiteUrl}
            </button>
            <button
              className="btn btn-sm bg-red-400 rounded-l-none"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <span className="loading loading-bars loading-xs"></span>
                  <span>{t("Deleting")}</span>
                </>
              ) : (
                <Icon icon={TrashIcon} fontSize={18} />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteUpload;
