"use client";
import { useAuthContext } from "@/states/auth";
import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import { useCustomHook } from "../use-custom";
import Icon from "@/components/Icon";
import TrashIcon from "@iconify/icons-lucide/trash";
import UploadIcon from "@iconify/icons-lucide/upload";
interface ImageUploaderProps {
  onLogoChange: (logo: string) => void;
  initialLogo: string;
}

export default function ImageUploader({ onLogoChange, initialLogo }: ImageUploaderProps) {
  const { state, currentChatbot } = useAuthContext();
  const { setValue } = useCustomHook();
  const [logo, setLogo] = useState(initialLogo);
  const [image, setImage] = React.useState([]);
  const maxNumber = 1;

  useEffect(() => {
    const initialImage = {
      data_url: initialLogo,
    };
    setImage(initialLogo ? [initialImage] : []);
  }, [initialLogo]);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImage(imageList);
    if (imageList[0]?.data_url) {
      setLogo(imageList[0].data_url);
      onLogoChange(imageList[0].data_url);
      setValue("logo", imageList[0].data_url);
    }
    if (imageList.length === 0) {
      setLogo("");
      onLogoChange("");
      setValue("logo", "");
    }
  };

  return (
    <div className=" mt-4">
      <ImageUploading
        multiple
        value={image}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper flex items-center space-x-2">
            <button
              style={isDragging ? { color: "red" } : undefined}
              onClick={() => imageList.length === 0 ? onImageUpload() : onImageUpdate(0)}
              className="btn btn-primary btn-sm"
              {...dragProps}
            >
              <Icon icon={UploadIcon} fontSize={18} />
            </button>
            {imageList.length > 0 && (
              <>
                <img src={imageList[0]["data_url"]} alt="" className="rounded w-32 px-6"/>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => onImageRemove(0)}
                >
                  <Icon icon={TrashIcon} fontSize={18} />
                </button>
              </>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}