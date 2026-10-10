// Deep-merge stored overrides over built-in defaults.
// Objects merge key by key; arrays and primitives are replaced wholesale.
export type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function deepMerge<T>(defaults: T, overrides: unknown): T {
  if (!isObj(defaults) || !isObj(overrides)) {
    return (overrides === undefined ? defaults : (overrides as T));
  }
  const out: Record<string, unknown> = { ...defaults };
  for (const [k, v] of Object.entries(overrides)) {
    if (!(k in defaults)) continue; // ignore unknown keys
    const d = (defaults as Record<string, unknown>)[k];
    out[k] = isObj(d) && isObj(v) ? deepMerge(d, v) : sameKind(d, v) ? v : d;
  }
  return out as T;
}

function sameKind(a: unknown, b: unknown) {
  if (Array.isArray(a)) return Array.isArray(b);
  return typeof a === typeof b;
}

export function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc === undefined || acc === null) return undefined;
    if (Array.isArray(acc)) return acc[Number(key)];
    return (acc as Record<string, unknown>)[key];
  }, obj);
}

/** Set a dotted path on a plain object (creating objects along the way). */
export function setPath(obj: Record<string, unknown>, path: string, value: unknown) {
  const keys = path.split(".");
  let cur: Record<string, unknown> = obj;
  keys.slice(0, -1).forEach((k) => {
    if (!isObj(cur[k])) cur[k] = {};
    cur = cur[k] as Record<string, unknown>;
  });
  cur[keys[keys.length - 1]] = value;
}

export function deletePath(obj: Record<string, unknown>, path: string) {
  const keys = path.split(".");
  let cur: unknown = obj;
  for (const k of keys.slice(0, -1)) {
    if (!isObj(cur)) return;
    cur = cur[k];
  }
  if (isObj(cur)) delete cur[keys[keys.length - 1]];
}

/** Every editable leaf path, treating arrays as a single field. */
export function listFields(obj: unknown, prefix = ""): string[] {
  if (!isObj(obj)) return [prefix];
  return Object.entries(obj).flatMap(([k, v]) => listFields(v, prefix ? `${prefix}.${k}` : k));
}
