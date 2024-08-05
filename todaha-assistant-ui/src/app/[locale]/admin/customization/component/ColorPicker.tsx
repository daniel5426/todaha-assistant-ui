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
    <div className="flex flex-row items-center justify-between">
      <label className="block text-base font-medium">{t(label)}</label>
      <div className="px-2">
      </div>
      <div style={{ position: "relative" }} >
        <div
          style={{
            padding: "5px",
            background: "#fff",
            borderRadius: "1px",
            boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
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
          <div style={{ position: "absolute", zIndex: "2", right: 0 }}>
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