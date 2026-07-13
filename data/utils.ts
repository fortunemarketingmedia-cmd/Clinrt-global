/** Deeply freeze a value to enforce immutability at runtime. */
export function deepFreeze<T>(value: T): Readonly<T> {
  if (value && typeof value === "object") {
    Object.freeze(value);
    Object.getOwnPropertyNames(value).forEach((prop) => {
      const nested = (value as Record<string, unknown>)[prop];
      if (nested && typeof nested === "object" && !Object.isFrozen(nested)) {
        deepFreeze(nested);
      }
    });
  }
  return value as Readonly<T>;
}
