"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";

import { MdOutlineFileUpload } from "react-icons/md";

interface IAvatarUploadProps {
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}

const AvatarUpload = ({ value, onChange, error }: IAvatarUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(value);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    onChange(file);

    // Allow selecting the same file again.
    event.target.value = "";
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={handleChange}
        aria-label="Upload avatar"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer items-center gap-4 text-left"
      >
        <span className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-card text-secondary">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Selected avatar preview"
              className="size-full object-cover"
            />
          ) : (
            <MdOutlineFileUpload className="size-5" />
          )}
        </span>

        <span>
          <span className="block font-semibold text-primary">
            Upload avatar (optional)
          </span>

          <span className="text-sm text-secondary">JPG, PNG or WEBP</span>

          {value && (
            <span className="mt-1 block max-w-60 truncate text-xs text-secondary">
              {value.name}
            </span>
          )}
        </span>
      </button>

      {error && (
        <p role="alert" className="mt-2 text-xs text-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default AvatarUpload;
