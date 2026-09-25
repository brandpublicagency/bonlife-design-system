import { displayTitle, orderKbSections, sectionDisplayNumbers } from "@/lib/kb-hierarchy";

export type KbExportSection = {
  id: string;
  slug: string;
  title: string;
  body_markdown: string;
  parent_id: string | null;
  sibling_order: number;
  order_index: number;
};

export function kbExportFilename(ext: "pdf" | "md"): string {
  const d = new Date().toISOString().slice(0, 10);
  return `bonlife-knowledge-base-${d}.${ext}`;
}

export function buildFullKbMarkdown(sections: KbExportSection[]): string {
  const ordered = orderKbSections(sections);
  const nums = sectionDisplayNumbers(ordered);
  const date = new Date().toISOString().slice(0, 10);
  const titles = ordered.map((section) => displayTitle(section.title, nums.get(section.id)));
  const toc = ordered
    .map((section, index) => `${section.parent_id ? "  " : ""}- ${titles[index]}`)
    .join("\n");
  const body = ordered
    .map((section, index) => {
      const heading = section.parent_id ? "###" : "##";
      const content = section.body_markdown.trim() || "_Details to be added._";
      return `${heading} ${titles[index]}\n\n${content}`;
    })
    .join("\n\n---\n\n");
  return `# Bonlife Knowledge Base\n\nUpdated ${date}\n\n## Contents\n\n${toc}\n\n---\n\n${body}\n`;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
