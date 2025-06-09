"use client";
import { deleteWebsiteUrl, uploadWebsiteUrl, uploadIndividualPages, deleteIndividualPage } from "@/app/lib/data";
import { Input, Button, Card, CardBody, Tab, Tabs, Textarea, Select } from "@/components/daisyui";
import useToast from "@/hooks/use-toast";
import { useAuthContext } from "@/states/auth";
import React, { useState, useEffect } from "react";
import Icon from "@/components/Icon";
import TrashIcon from "@iconify/icons-lucide/trash";
import PlusIcon from "@iconify/icons-lucide/plus";
import SettingsIcon from "@iconify/icons-lucide/settings";
import GlobeIcon from "@iconify/icons-lucide/globe";
import FileTextIcon from "@iconify/icons-lucide/file-text";
import { useTranslations } from "next-intl";

interface CrawlSettings {
  maxPages: number;
  parallelRequests: number;
  qualityThreshold: number;
  includeSubdomains: boolean;
  respectRobots: boolean;
}

const WebsiteUpload = () => {
  const t = useTranslations("configuration");
  
  // Upload mode: 'full' or 'specific'
  const [uploadMode, setUploadMode] = useState<'full' | 'specific'>('full');
  
  // Full website crawling
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  
  // Specific pages
  const [specificPages, setSpecificPages] = useState<string[]>(['']);
  
  // Crawl settings
  const [crawlSettings, setCrawlSettings] = useState<CrawlSettings>({
    maxPages: 200,
    parallelRequests: 5,
    qualityThreshold: 10,
    includeSubdomains: false,
    respectRobots: true
  });
  
  // Advanced settings toggle
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  
  const [existingWebsiteUrl, setExistingWebsiteUrl] = useState<string>("");
  const [existingIndividualPages, setExistingIndividualPages] = useState<any[]>([]);
  const { updateUserInfo, state } = useAuthContext();
  const { toaster } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    setExistingWebsiteUrl(state.user?.assistant.website_url);
    setExistingIndividualPages(state.user?.assistant.individual_pages || []);
  }, [state.user?.assistant.website_url, state.user?.assistant.individual_pages]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      let toggle = false;
      interval = setInterval(() => {
        setLoadingMessage(toggle ? t("download_website_pages") : t("upload_pages_to_ai"));
        toggle = !toggle;
      }, 2000);
    } else {
      setLoadingMessage("");
    }
    return () => clearInterval(interval);
  }, [isLoading, t]);

  // Validation functions
  const validateUrl = (url: string): boolean => {
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ 
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ 
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
      '(\\#[-a-z\\d_]*)?$','i');
    return urlPattern.test(url);
  };

  const validateInputs = (): boolean => {
    const errors: string[] = [];
    
    if (uploadMode === 'full') {
      if (!websiteUrl.trim()) {
        errors.push(t("websiteRequired"));
      } else if (!validateUrl(websiteUrl)) {
        errors.push(t("invalidUrl"));
      }
    } else {
      const validPages = specificPages.filter(page => page.trim() !== '');
      if (validPages.length === 0) {
        errors.push(t("pageRequired"));
      } else {
        validPages.forEach((page, index) => {
          if (!validateUrl(page)) {
            errors.push(t("invalidPageUrl", { index: index + 1 }));
          }
        });
      }
    }

    if (crawlSettings.maxPages < 1 || crawlSettings.maxPages > 500) {
      errors.push(t("maxPagesRange"));
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  // Handle specific pages management
  const addSpecificPage = () => {
    setSpecificPages([...specificPages, '']);
  };

  const removeSpecificPage = (index: number) => {
    if (specificPages.length > 1) {
      setSpecificPages(specificPages.filter((_, i) => i !== index));
    }
  };

  const updateSpecificPage = (index: number, value: string) => {
    const updated = [...specificPages];
    updated[index] = value;
    setSpecificPages(updated);
  };

  const handleUpload = async () => {
    if (!validateInputs()) {
      return;
    }

    // Check if website already exists or if adding individual pages would exceed limit
    if (uploadMode === 'full' && state.user?.assistant.website_url !== "") {
      toaster.error(t("websiteExists"));
      return;
    }

    if (uploadMode === 'specific') {
      const currentIndividualPages = (state.user?.assistant as any)?.individual_pages?.length || 0;
      const validPages = specificPages.filter(page => page.trim() !== '');
      if (currentIndividualPages + validPages.length > 10) {
        toaster.error(t("tooManyIndividualPages", { current: currentIndividualPages, max: 10 }));
        return;
      }
    }

    setIsLoading(true);
    setValidationErrors([]);

    try {
      let response;
      
      if (uploadMode === 'full') {
        const crawlConfig = {
          parallelRequests: crawlSettings.parallelRequests,
          qualityThreshold: crawlSettings.qualityThreshold,
          includeSubdomains: crawlSettings.includeSubdomains,
          respectRobots: crawlSettings.respectRobots
        };
        response = await uploadWebsiteUrl(websiteUrl, crawlSettings.maxPages, crawlConfig);
      } else {
        // For individual pages upload
        const validPages = specificPages.filter(page => page.trim() !== '');
        toaster.success(t("startingUpload", { count: validPages.length }));
        
        response = await uploadIndividualPages(
          validPages,
          crawlSettings.qualityThreshold,
          crawlSettings.respectRobots
        );
      }

      if (response.status === 200) {
        await updateUserInfo();
        if (uploadMode === 'full') {
          const pagesProcessed = response.data?.status?.pages_processed || 0;
          toaster.success(t("uploadSuccess", { count: pagesProcessed }));
        } else {
          const pagesUploaded = response.data?.status?.pages_uploaded || 0;
          toaster.success(t("individualPagesUploaded", { count: pagesUploaded }));
        }
        
        // Reset form
        setWebsiteUrl("");
        setSpecificPages(['']);
      } else {
        toaster.error(t("uploadFailed"));
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || t("uploadError");
      toaster.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteIndividualPage = async (pageUrl: string) => {
    try {
      await deleteIndividualPage(pageUrl);
      await updateUserInfo();
      toaster.success(t("pageDeleted"));
    } catch (error) {
      toaster.error(t("deleteError"));
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
        await deleteWebsiteUrl();
      
      await updateUserInfo();
      toaster.success(t("deleteSuccess"));
      // Update files state to remove the deleted file
      setWebsiteUrl("");
    } catch (error) {
      toaster.error(t("deleteError"));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Mode Selection */}
      <div className="bg-base-200 p-1 rounded-lg">
        <Tabs className="w-full bg-transparent">
          <Tab 
            active={uploadMode === 'full'} 
            onClick={() => setUploadMode('full')}
            className={`flex-nowrap rounded-md transition-all duration-200 ${
              uploadMode === 'full' 
                ? 'bg-white shadow-sm text-primary font-medium' 
                : 'text-base-content/70 hover:text-base-content'
            }`}
          >
                      <div className="flex items-center justify-center gap-2 py-2">
            <Icon icon={GlobeIcon} fontSize={16} />
            <span className="text-sm">{t("fullWebsite")}</span>
          </div>
          </Tab>
          <Tab 
            active={uploadMode === 'specific'} 
            onClick={() => setUploadMode('specific')}
            className={`flex-nowrap rounded-md transition-all duration-200 ${
              uploadMode === 'specific' 
                ? 'bg-white shadow-sm text-primary font-medium' 
                : 'text-base-content/70 hover:text-base-content'
            }`}
          >
                      <div className="flex items-center justify-center gap-2 py-2">
            <Icon icon={FileTextIcon} fontSize={16} />
            <span className="text-sm">{t("specificPages")}</span>
          </div>
          </Tab>
        </Tabs>
      </div>

      {/* Full Website Mode */}
      {uploadMode === 'full' && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-base-content/80 mb-2">
              {t("websiteUrl")}
            </label>
            <Input
              className="w-full"
              type="text"
              value={websiteUrl}
              size="sm"
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://www.example.com"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-base-content/80 mb-2">
                {t("maxPages")}
              </label>
              <Input
                className="w-full"
                type="number"
                value={crawlSettings.maxPages}
                size="sm"
                min={1}
                max={500}
                onChange={(e) => setCrawlSettings({...crawlSettings, maxPages: parseInt(e.target.value) || 200})}
                placeholder="200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content/80 mb-2">
                {t("crawlSpeed")}
              </label>
              <Select
                className="w-full"
                size="sm"
                value={crawlSettings.parallelRequests}
                onChange={(e) => setCrawlSettings({...crawlSettings, parallelRequests: parseInt(e.target.value)})}
              >
                <option value={3}>{t("slowSpeed")}</option>
                <option value={5}>{t("normalSpeed")}</option>
                <option value={8}>{t("fastSpeed")}</option>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Specific Pages Mode */}
      {uploadMode === 'specific' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-base-content/80">
              {t("pageUrls")}
            </label>
            <button
              className="btn btn-xs btn-outline btn-primary"
              onClick={addSpecificPage}
              type="button"
            >
              <Icon icon={PlusIcon} fontSize={14} />
              {t("addPage")}
            </button>
          </div>
          
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {specificPages.map((page, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  className="flex-1"
                  type="text"
                  value={page}
                  size="sm"
                  onChange={(e) => updateSpecificPage(index, e.target.value)}
                  placeholder={`https://example.com/page-${index + 1}`}
                />
                {specificPages.length > 1 && (
                  <button
                    className="btn btn-xs btn-square btn-error"
                    onClick={() => removeSpecificPage(index)}
                    type="button"
                  >
                    <Icon icon={TrashIcon} fontSize={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Advanced Settings */}
      <div>
        <button
          className="btn btn-xs btn-ghost text-base-content/60 gap-1"
          onClick={() => setShowAdvanced(!showAdvanced)}
          type="button"
        >
          <Icon icon={SettingsIcon} fontSize={14} />
          {t("advancedSettings")}
          <span className={`transform transition-transform ${showAdvanced ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        
        {showAdvanced && (
          <Card className="mt-2 bg-base-50">
            <CardBody className="p-3 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-base-content/70 mb-1">
                    {t("qualityThreshold")}
                  </label>
                  <Input
                    className="w-full"
                    type="number"
                    value={crawlSettings.qualityThreshold}
                    size="sm"
                    min={0}
                    max={30}
                    onChange={(e) => setCrawlSettings({...crawlSettings, qualityThreshold: parseInt(e.target.value) || 10})}
                  />
                  <span className="text-xs text-base-content/50">{t("higherQuality")}</span>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-xs"
                      checked={crawlSettings.includeSubdomains}
                      onChange={(e) => setCrawlSettings({...crawlSettings, includeSubdomains: e.target.checked})}
                    />
                    {t("includeSubdomains")}
                  </label>
                  <label className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-xs"
                      checked={crawlSettings.respectRobots}
                      onChange={(e) => setCrawlSettings({...crawlSettings, respectRobots: e.target.checked})}
                    />
                    {t("respectRobots")}
                  </label>
                </div>
              </div>
            </CardBody>
          </Card>
        )}
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="alert alert-error py-2">
          <div>
            <p className="text-sm font-medium">{t("fixErrors")}</p>
            <ul className="text-xs mt-1 list-disc list-inside">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Upload Button */}
      <Button
        color="primary"
        size="sm"
        className="w-full gap-2"
        onClick={handleUpload}
        loading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="loading loading-bars loading-xs"></span>
            <span>{t("Loading")}</span>
          </>
        ) : (
          <>
            <Icon icon={uploadMode === 'full' ? GlobeIcon : FileTextIcon} fontSize={16} />
            {uploadMode === 'full' ? t("crawlWebsite") : t("uploadPages")}
          </>
        )}
      </Button>

      {/* Upload Info */}
      <div className="text-xs text-base-content/60 bg-base-200 p-2 rounded">
        {uploadMode === 'full' ? (
          <p>📡 {t("willCrawl", { maxPages: crawlSettings.maxPages })}</p>
        ) : (
          <p>📄 {t("willUpload", { count: specificPages.filter(p => p.trim()).length })}</p>
        )}
      </div>

      {/* Loading Message */}
      {isLoading && (
        <div className="text-sm text-primary mt-2 flex items-center gap-2 px-2">
          <span className="loading loading-dots loading-xs"></span>
          {loadingMessage}
        </div>
      )}

      {/* Existing Website Display */}
      {existingWebsiteUrl !== "" && (
        <div className="pt-2">
          <label className="block text-sm font-medium text-base-content/80 mb-2">
            {t("currentWebsite")}
          </label>
          <div className="flex w-full">
            <div className="btn btn-sm flex-1 rounded-r-none truncate border-r-0 bg-success/10 text-success">
              {existingWebsiteUrl}
            </div>
            <button
              className="btn btn-sm bg-error text-error-content rounded-l-none hover:bg-error/90"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <span className="loading loading-bars loading-xs"></span>
              ) : (
                <Icon icon={TrashIcon} fontSize={16} />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Existing Individual Pages Display */}
      {existingIndividualPages.length > 0 && (
        <div className="pt-2">
          <label className="block text-sm font-medium text-base-content/80 mb-2">
            {t("individualPages")} ({existingIndividualPages.length}/10)
          </label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {existingIndividualPages.map((page: any, index: number) => (
              <div key={index} className="flex w-full">
                <div className="btn btn-xs flex-1 rounded-r-none truncate border-r-0 bg-info/10 text-info text-left justify-start">
                  {page.url}
                </div>
                <button
                  className="btn btn-xs bg-error text-error-content rounded-l-none hover:bg-error/90"
                  onClick={() => handleDeleteIndividualPage(page.url)}
                >
                  <Icon icon={TrashIcon} fontSize={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteUpload;
