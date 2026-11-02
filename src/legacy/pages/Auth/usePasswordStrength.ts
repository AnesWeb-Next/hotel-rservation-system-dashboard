import { useMemo } from "react";

const passwordStrengthRules = [
  { label: "At least 8 characters", regex: /.{8,}/ },
  { label: "One uppercase letter", regex: /[A-Z]/ },
  { label: "One lowercase letter", regex: /[a-z]/ },
  { label: "One number", regex: /[0-9]/ },
  { label: "One special character", regex: /[^A-Za-z0-9]/ },
];

export function usePasswordStrength(password: string) {
  const strength = useMemo(
    () =>
      passwordStrengthRules.map((rule) => ({
        ...rule,
        passed: rule.regex.test(password),
      })),
    [password],
  );
  const score = strength.filter((r) => r.passed).length;
  return { strength, score };
}
