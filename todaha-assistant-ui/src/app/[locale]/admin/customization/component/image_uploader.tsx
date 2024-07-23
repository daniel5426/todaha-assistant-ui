import { useAuthContext } from "@/states/auth";
import React from "react";
import ImageUploading from "react-images-uploading";
import useCustom from "../use-custom";

export default function ImageUploader() {
  const {state, currentChatbotId  } = useAuthContext()
  const {setValue} = useCustom()
  const initialLogo = state.user?.assistant?.chatbots.find(chatbot => chatbot.id === currentChatbotId)?.logo;
  const [image, setImage] = React.useState(initialLogo ? [initialLogo] : []);
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImage(imageList);
    setValue("logo", imageList[0]?.data_url);
  };

  return (
    <div className=" mt-2">
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
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : undefined}
              onClick={() => {
                if (imageList.length === 0) {
                  onImageUpload();
                } else {
                  onImageUpdate(0);
                }
              }}
              className="btn btn-primary btn-sm"
              {...dragProps}
            >
              {imageList.length === 0 ? "Upload Image" : "Update Image"}
            </button>
            &nbsp;
            {imageList.length > 0 && (
              <div className="image-item">
                <img src={imageList[0]["data_url"]} alt="" width="100" className="p-2"/>
                <div className="image-item__btn-wrapper">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onImageRemove(0)}
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
