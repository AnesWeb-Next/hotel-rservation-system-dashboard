export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateSerialNumber(): string {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `BK-${num}`;
}
