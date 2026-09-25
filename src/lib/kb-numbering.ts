// Backwards-compatible helpers for flat callers. Hierarchical Knowledge Base
// views use kb-hierarchy.ts so child sections can display numbers such as 10.1.
export function isUnnumbered(slug: string): boolean {
  return slug === "introduction";
}

export function sectionNumbers(sections: { slug: string }[]): (number | null)[] {
  let n = 0;
  return sections.map((section) => (isUnnumbered(section.slug) ? null : ++n));
}

export function numberedTitle(title: string, num: number | null): string {
  return num == null ? title : `${num}. ${title}`;
}
