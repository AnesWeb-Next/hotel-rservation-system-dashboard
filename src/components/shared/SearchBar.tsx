import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
  autoFocus?: boolean;
}

export function SearchBar({
  value: externalValue,
  onChange,
  placeholder = "Search...",
  debounceMs = 300,
  className,
  autoFocus = false,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(externalValue ?? "");
  const debouncedValue = useDebounce(inputValue, debounceMs);

  // Store onChange in a ref to avoid triggering effects on every render
  const onChangeRef = React.useRef(onChange);

  // Update ref in an effect (not during render)
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  // Trigger onChange when debounced value changes
  useEffect(() => {
    onChangeRef.current(debouncedValue);
  }, [debouncedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleClear = (): void => {
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Escape") {
      handleClear();
    }
  };

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="pl-9 pr-9"
        autoFocus={autoFocus}
      />
      {inputValue ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </Button>
      ) : null}
    </div>
  );
}
