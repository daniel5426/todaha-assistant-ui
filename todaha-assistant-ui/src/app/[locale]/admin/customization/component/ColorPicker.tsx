"use client";
import React from 'react';
import { SketchPicker, ColorChangeHandler } from 'react-color';
import { useTranslations } from 'next-intl';

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: ColorChangeHandler;
  displayPicker: boolean;
  togglePicker: () => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  color,
  onChange,
  displayPicker,
  togglePicker,
}) => {
  const t = useTranslations("customization");

  return (
    <div className="flex flex-row items-center justify-between w-full">
      <label className="block font-medium text-sm">{t(label)}</label>
      <div className="p-1"></div>
      <div style={{ position: "relative" }}>
        <div
          style={{
            padding: "5px",
            background: "#ffffff",
            borderRadius: "5px",
            border: "1px solid #3E5EFF",
            display: "inline-block",
            cursor: "pointer",
          }}
          onClick={togglePicker}
        >
          <div
            style={{
              width: "36px",
              height: "14px",
              borderRadius: "2px",
              background: color,
            }}
          />
        </div>
        {displayPicker && (
          <div style={{ position: "absolute", zIndex: "99999999", right: 0 }}>
            <div
              style={{
                position: "fixed",
                top: "0px",
                right: "0px",
                bottom: "0px",
                left: "0px",
              }}
              onClick={togglePicker}
            />
            <SketchPicker color={color} onChange={onChange} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;