"use client";
import { deleteFile, uploadFile } from "@/app/lib/data";
import { Button, FileInput } from "@/components/daisyui";
import useToast from "@/hooks/use-toast";
import { useAuthContext } from "@/states/auth";
import React, { useState, useEffect } from "react";
import Icon from "@/components/Icon";
import TrashIcon from "@iconify/icons-lucide/trash";
import { useTranslations } from "next-intl";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);
  const { updateUserInfo, state } = useAuthContext();
  const { toaster } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (state.user?.assistant?.files) {
      const initialFiles = state.user.assistant.files.slice(0, 3);
      setFiles(initialFiles);
    } else {
      setFiles([]);
    }
  }, [state.user?.assistant?.files]);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setIsLoading(true);
    if (!selectedFile) {
      toaster.error("No file selected for upload");
      setIsLoading(false);
      return;
    }

    if (files.length >= 3) {
      toaster.error("Maximum 3 files allowed");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await uploadFile(formData);
      if (response.status === 200) {
        await updateUserInfo();
        toaster.success("File uploaded successfully");
        setFiles(prevFiles => [...prevFiles, { id: selectedFile.name, name: selectedFile.name }]);
      } else {
        toaster.error("Failed to upload file");
      }
    } catch (error) {
      toaster.error("Error uploading file");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (fileId: string) => {
    setIsDeleting(prevState => ({ ...prevState, [fileId]: true }));
    try {
      // Optimistically update UI first
      
      // Then perform server operation
      await deleteFile(fileId);

      await updateUserInfo();
      toaster.success("File deleted successfully");
    } catch (error) {
      // If server operation fails, revert the UI by re-fetching the current state
      await updateUserInfo();
      toaster.error("Error deleting file");
    } finally {
      setIsDeleting(prevState => ({ ...prevState, [fileId]: false }));
    }
  };
  const t = useTranslations("configuration");

  return (
    <div>
      <div className="mb-3 flex flex-row items-center gap-2">
        <FileInput
          className="w-full max-w-[300px] bg-base-200"
          size={"md"}
          color="neutral"
          onChange={handleFileChange}
        />
        <button
          className="btn whitespace-nowrap"
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

      {files.map((file: any) => (
        <div key={file.id}>
          <div className="flex w-full mb-2">
            <button className="btn flex-1 rounded-r-none truncate border-r-0">
              {file.name}
            </button>
            <button
              className="btn bg-red-400 rounded-l-none"
              onClick={() => handleDelete(file.id)}
              disabled={isDeleting[file.id]}
            >
              {isDeleting[file.id] ? (
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
      ))}
    </div>
  );
};

export default FileUpload;
