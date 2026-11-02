export function getDisplayName(
  ref:
    | string
    | { title?: string; firstName?: string; lastName?: string; name?: string }
    | null
    | undefined,
): string {
  if (!ref) return "Unknown";
  if (typeof ref === "string") return ref;
  if ("title" in ref && ref.title) return ref.title;
  if ("firstName" in ref && ref.firstName) {
    return `${ref.firstName} ${ref.lastName ?? ""}`.trim();
  }
  if ("name" in ref && ref.name) return ref.name;
  return "Unknown";
}

export function getIdFromRef(
  ref: string | { _id: string } | null | undefined,
): string {
  if (!ref) return "";
  if (typeof ref === "string") return ref;
  return ref._id;
}
