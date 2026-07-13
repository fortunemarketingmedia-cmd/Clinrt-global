const CONTROL_CHARACTERS = /[\u0000-\u001F\u007F]/g;
const WHITESPACE = /\s+/g;
const PHONE_CHARACTERS = /[^0-9+()\-\s]/g;

export function sanitizeTextValue(value: string) {
  return value.replace(CONTROL_CHARACTERS, "").replace(WHITESPACE, " ").trim();
}

export function sanitizeEmailValue(value: string) {
  return sanitizeTextValue(value).toLowerCase();
}

export function sanitizePhoneValue(value: string) {
  return sanitizeTextValue(value).replace(PHONE_CHARACTERS, "");
}

export function sanitizeSearchValue(value: string) {
  return sanitizeTextValue(value).slice(0, 120);
}

export function sanitizeEnumValue<T extends string>(
  value: string | null,
  allowedValues: readonly T[],
  fallback: T,
) {
  return value !== null && allowedValues.includes(value as T)
    ? (value as T)
    : fallback;
}
