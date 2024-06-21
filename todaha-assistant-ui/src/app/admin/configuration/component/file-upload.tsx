import { uploadFile } from "@/app/lib/data";
import { Button, FileInput } from "@/components/daisyui";
import useToast from "@/hooks/use-toast";
import React, { useState } from "react";

const FileUpload = ({ files }: any) => {
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toaster } = useToast();


  const handleFileChange = (fileId: any, event: any) => {
    setSelectedFiles({
      ...selectedFiles,
      [fileId]: event.target.files[0],
    });
  };

  const handleUpload = async (fileId: any) => {
    setIsLoading(true);
    const file = selectedFiles[fileId];
    if (!file) {
      toaster.error('No file selected for upload');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await uploadFile(formData, fileId);
      if (response.status === 200) {
        toaster.success('File uploaded successfully');
      } else {
        toaster.error('Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toaster.error('Error uploading file');
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <div>
      {files.map((file: any) => (
        <div key={file.id} className="">
          <div className="file-name">{file.name}</div>
          <div className="gap-2 grid grid-cols-5">
            <div className=" col-span-3">
              <FileInput
                className=" max-w-64 bg-base-200  sm:max-w-xs mt-1 col-auto"
                size={"sm"}
                color="info"
                onChange={(event) => handleFileChange(file.id, event)}
                name={file.name}
              />
            </div>
            <div className=" col-span-2">
              <button className="btn btn-sm" onClick={() => handleUpload(file.id)}>
                {isLoading ? <><span className="loading loading-bars loading-xs"></span><span>loading</span></>
 : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileUpload;
