export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function isEmpty(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0;
}

export function compact<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => value !== undefined && value !== null && value !== "",
    ),
  ) as Partial<T>;
}

export function getNestedValue<T>(
  obj: Record<string, unknown>,
  path: string,
): T | undefined {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj) as T | undefined;
}
