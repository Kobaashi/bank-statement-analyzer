"use client";

import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropzoneFieldProps {
  onFileChange: (file: File | null) => void;
}

export function DropzoneField({ onFileChange }: DropzoneFieldProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => onFileChange(files[0] || null),
    accept: { "text/csv": [".csv"] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "group relative flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-background transition-all hover:border-primary/50 hover:bg-muted/50",
        isDragActive && "border-primary bg-primary/5",
      )}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground transition-colors group-hover:text-foreground">
        <div className="rounded-full bg-muted p-3 group-hover:bg-background">
          <Upload className="h-6 w-6" />
        </div>
        <p className="text-sm font-medium">
          {isDragActive
            ? "Drop the file here"
            : "Drag & drop CSV or click to upload"}
        </p>
        <p className="text-xs">Maximum file size: 10MB</p>
      </div>
    </div>
  );
}
