import superjson from "superjson";

export function convertToPlainObject<T>(value: T): T {
  return superjson.parse(superjson.stringify(value));
}
