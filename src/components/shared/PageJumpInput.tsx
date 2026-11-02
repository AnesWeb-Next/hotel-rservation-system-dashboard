import React, { useState } from "react";
import { Input } from "@/components/ui/input";

interface PageJumpInputProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PageJumpInput({
  currentPage,
  totalPages,
  onPageChange,
}: PageJumpInputProps) {
  const [jumpToPage, setJumpToPage] = useState("");

  const handleJumpToPage = (): void => {
    const page = Number.parseInt(jumpToPage, 10);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setJumpToPage("");
    }
  };

  return (
    <div className="flex items-center gap-2 px-2">
      <span className="text-sm">Page</span>
      <Input
        type="number"
        min={1}
        max={totalPages}
        value={jumpToPage}
        onChange={(e) => setJumpToPage(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") handleJumpToPage();
        }}
        onBlur={handleJumpToPage}
        placeholder={currentPage.toString()}
        className="w-14 h-8 text-center"
      />
      <span className="text-sm">of {totalPages || 1}</span>
    </div>
  );
}
