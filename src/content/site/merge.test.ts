import { describe, expect, it } from "vitest";
import { deepMerge, setPath, deletePath } from "./merge";
import { contactDefaults } from "./contact";

describe("site content merge", () => {
  it("an edited field replaces the built-in text", () => {
    const m = deepMerge(contactDefaults, { headOffice: { phone: "+264 61 000 000" } });
    expect(m.headOffice.phone).toBe("+264 61 000 000");
    expect(m.headOffice.email).toBe("info@bonlifenam.com");
  });

  it("an edit with the wrong type falls back to the built-in text", () => {
    const m = deepMerge(contactDefaults, { headOffice: { phone: 42 }, branches: { list: "x" } });
    expect(m.headOffice.phone).toBe("+264 61 250 339");
    expect(m.branches.list).toHaveLength(20);
  });

  it("restoring a field removes the edit", () => {
    const o: Record<string, unknown> = {};
    setPath(o, "headOffice.phone", "1");
    deletePath(o, "headOffice.phone");
    expect(deepMerge(contactDefaults, o).headOffice.phone).toBe("+264 61 250 339");
  });
});
