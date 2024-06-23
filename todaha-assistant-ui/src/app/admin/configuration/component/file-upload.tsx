import { deleteFile, uploadFile } from "@/app/lib/data";
import { Button, FileInput } from "@/components/daisyui";
import useToast from "@/hooks/use-toast";
import { useAuthContext } from "@/states/auth";
import React, { useState, useEffect } from "react";
import Icon from "@/components/Icon";
import TrashIcon from "@iconify/icons-lucide/trash";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);
  const { updateUserInfo, state } = useAuthContext();
  const { toaster } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const initialFiles: any[] = [];
    state.user?.files.forEach((file, index) => {
      if (index < 3) {
        initialFiles[index] = file;
      }
    });
    setFiles(initialFiles);
  }, [state.user?.files]);

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

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await uploadFile(formData);
      if (response.status === 200) {
        await updateUserInfo();
        toaster.success("File uploaded successfully");
        // Refresh the files after upload
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
      await deleteFile(fileId);
      await updateUserInfo();
      toaster.success("File deleted successfully");
      // Update files state to remove the deleted file
      setFiles(files.filter(file => file.id !== fileId));
    } catch (error) {
      toaster.error("Error deleting file");
    } finally {
      setIsDeleting(prevState => ({ ...prevState, [fileId]: false }));
    }
  };

  return (
    <div>
      <div className="mb-3">
        <FileInput
          className="max-w-64 bg-base-200 sm:max-w-xs mt-1 col-auto mr-2"
          size={"md"}
          color="neutral"
          onChange={handleFileChange}
        />
        <button
          className="btn right-full"
          onClick={handleUpload}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading loading-bars loading-xs"></span>
              <span>Loading</span>
            </>
          ) : (
            "Upload"
          )}
        </button>
        <label className="label">
          <span className="label-text-alt">Max 3 files - 50 MB Max</span>
        </label>
      </div>

      {files.map((file: any) => (
        <div key={file.id} className="">
          <div className="join join-vertical lg:join-horizontal mb-2">
            <button className="btn join-item w-64 text-left no-animation rounded-none">
              {file.name}
            </button>
            <button
              className="btn join-item bg-red-400"
              onClick={() => handleDelete(file.id)}
              disabled={isDeleting[file.id]}
            >
              {isDeleting[file.id] ? (
                <>
                  <span className="loading loading-bars loading-xs"></span>
                  <span>Deleting</span>
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
