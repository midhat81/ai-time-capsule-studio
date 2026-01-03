"use client";

import { Upload, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface UploadPhotoProps {
  onPhotoSelect: (file: File) => void;
  selectedPhoto: File | null;
}

export function UploadPhoto({ onPhotoSelect, selectedPhoto }: UploadPhotoProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onPhotoSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onPhotoSelect(null as any);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">
          Upload a Photo
        </h2>
        <p className="text-gray-600">
          Choose a meaningful moment to preserve in your time capsule
        </p>
      </div>

      <div className="w-full max-w-md">
        {!preview ? (
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        ) : (
          <div className="relative w-full h-64 rounded-lg overflow-hidden group">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {preview && (
        <p className="text-sm text-green-600 font-medium">
          ✓ Photo uploaded successfully
        </p>
      )}
    </div>
  );
}