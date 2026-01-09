"use client";
import React, { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";

interface ImagePickerProps {
  label: string;
  onImageSelect?: (file: File | null) => void;
  aspectRatio?: string;
  maxWidth?: string;
}

const ImagePicker = ({
  label,
  onImageSelect,
  aspectRatio = "aspect-[1.3/1]",
  maxWidth = "max-w-[320px]",
}: ImagePickerProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    if (onImageSelect) onImageSelect(file);
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (onImageSelect) onImageSelect(null);
  };

  return (
    <div className={`flex flex-col gap-2 w-full ${maxWidth}`}>
      <label className="text-[#1a237e] font-semibold text-sm ml-1">
        {label}
      </label>

      <div
        onClick={() => !preview && fileInputRef.current?.click()}
        className={`relative ${aspectRatio} w-full bg-[#FCDED6] rounded-[30px] flex items-center justify-center overflow-hidden transition-all group ${
          !preview
            ? "cursor-pointer hover:bg-[#fbcbc0] active:scale-[0.98]"
            : ""
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {preview ? (
          <>
            <Image
              src={preview}
              alt="Selected"
              fill
              unoptimized
              className="object-cover"
            />
            <button
              type="button"
              onClick={clearImage}
              className="absolute z-10 top-3 right-3 bg-white/90 p-1.5 rounded-full shadow-sm hover:bg-white hover:text-red-500 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </>
        ) : (
          <div className="bg-[#FFCCBC] p-5 rounded-2xl group-hover:scale-110 transition-transform">
            <svg
              className="w-12 h-12 text-[#FFAB91]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePicker;
