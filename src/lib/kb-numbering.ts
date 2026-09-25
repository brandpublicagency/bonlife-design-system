// Section numbers are derived from position - never typed into titles.
// The "introduction" section is unnumbered.
export function isUnnumbered(slug: string): boolean {
  return slug === "introduction";
}

export function sectionNumbers(sections: { slug: string }[]): (number | null)[] {
  let n = 0;
  return sections.map((s) => (isUnnumbered(s.slug) ? null : ++n));
}

export function numberedTitle(title: string, num: number | null): string {
  return num == null ? title : `${num}. ${title}`;
}
