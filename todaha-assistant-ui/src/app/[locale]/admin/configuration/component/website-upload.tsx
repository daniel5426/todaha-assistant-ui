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
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [existingWebsiteUrl, setExistingWebsiteUrl] = useState<string>("");
  const { updateUserInfo, state } = useAuthContext();
  const { toaster } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    setExistingWebsiteUrl(state.user?.assistant.website_url);
  }, [state.user?.assistant.website_url]);


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
  const t = useTranslations("configuration");

  return (
    <div>
      <div className="mb-3">
        <Input
          type="text"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
        />
        <button
          className="btn right-full m-2"
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

      {existingWebsiteUrl !== "" && (
        <div className="">
          <div className="join join-vertical lg:join-horizontal mb-2">
            <button className="btn join-item w-64 no-animation rounded-none truncate">
              {existingWebsiteUrl}
            </button>
            <button
              className="btn join-item bg-red-400"
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
