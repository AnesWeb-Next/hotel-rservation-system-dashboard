export interface FilterOption {
  key: string;
  label: string;
  type: "select" | "text" | "number" | "date";
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface FilterValue {
  [key: string]: string | number | undefined;
}
