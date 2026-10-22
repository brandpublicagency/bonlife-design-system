import { beforeEach, describe, expect, it, vi } from "vitest";

import { deleteLeafKbSection } from "./kb-delete";

describe("Knowledge Base deletion safeguards", () => {
  const id = "ed46977c-2af7-4db6-aba2-34ff9cc32584";
  const childEq = vi.fn();
  const deleteEq = vi.fn();
  const remove = vi.fn(() => ({ eq: deleteEq }));
  const select = vi.fn(() => ({ eq: childEq }));
  const sb = { from: vi.fn(() => ({ select, delete: remove })) };
  const run = () => deleteLeafKbSection(sb as unknown as Parameters<typeof deleteLeafKbSection>[0], id);

  beforeEach(() => {
    vi.clearAllMocks();
    childEq.mockResolvedValue({ count: 0, error: null });
    deleteEq.mockResolvedValue({ error: null });
  });

  it("refuses to delete Plans with nine nested plan sections", async () => {
    childEq.mockResolvedValue({ count: 9, error: null });
    await expect(run()).rejects.toThrow("9 nested sections");
    expect(childEq).toHaveBeenCalledWith("parent_id", id);
    expect(remove).not.toHaveBeenCalled();
  });

  it("allows deletion of a section with no children", async () => {
    await expect(run()).resolves.toEqual({ ok: true });
    expect(deleteEq).toHaveBeenCalledWith("id", id);
  });

  it("does not delete when checking children fails", async () => {
    childEq.mockResolvedValue({ count: null, error: { message: "Read failed" } });
    await expect(run()).rejects.toThrow("Read failed");
    expect(remove).not.toHaveBeenCalled();
  });

  it("does not delete when the child count is unavailable", async () => {
    childEq.mockResolvedValue({ count: null, error: null });
    await expect(run()).rejects.toThrow("Could not check nested sections");
    expect(remove).not.toHaveBeenCalled();
  });
});