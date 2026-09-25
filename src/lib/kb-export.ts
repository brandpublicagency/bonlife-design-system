import { numberedTitle, sectionNumbers } from "@/lib/kb-numbering";

export type KbExportSection = { slug: string; title: string; body_markdown: string };

export function kbExportFilename(ext: "pdf" | "md"): string {
  const d = new Date().toISOString().slice(0, 10);
  return `bonlife-knowledge-base-${d}.${ext}`;
}

export function buildFullKbMarkdown(sections: KbExportSection[]): string {
  const nums = sectionNumbers(sections);
  const date = new Date().toISOString().slice(0, 10);
  const titles = sections.map((s, i) => numberedTitle(s.title, nums[i]));
  const toc = titles.map((t) => `- ${t}`).join("\n");
  const body = sections
    .map((s, i) => `## ${titles[i]}\n\n${s.body_markdown.trim()}`)
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
