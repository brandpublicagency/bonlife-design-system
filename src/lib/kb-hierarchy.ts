export type KbHierarchySection = {
  id: string;
  slug: string;
  title: string;
  parent_id: string | null;
  sibling_order: number;
  order_index: number;
};

export function orderKbSections<T extends KbHierarchySection>(sections: T[]): T[] {
  const bySibling = (a: T, b: T) =>
    a.sibling_order - b.sibling_order || a.order_index - b.order_index;
  const roots = sections.filter((section) => section.parent_id == null).sort(bySibling);
  const children = new Map<string, T[]>();

  for (const section of sections) {
    if (!section.parent_id) continue;
    const group = children.get(section.parent_id) ?? [];
    group.push(section);
    children.set(section.parent_id, group);
  }

  return roots.flatMap((root) => [root, ...(children.get(root.id) ?? []).sort(bySibling)]);
}

export function sectionDisplayNumbers(
  sections: KbHierarchySection[],
): Map<string, string | null> {
  const ordered = orderKbSections(sections);
  const numbers = new Map<string, string | null>();
  const rootNumbers = new Map<string, number>();
  let rootNumber = 0;

  for (const section of ordered) {
    if (section.parent_id) continue;
    if (section.slug === "introduction") {
      numbers.set(section.id, null);
      continue;
    }
    rootNumber += 1;
    rootNumbers.set(section.id, rootNumber);
    numbers.set(section.id, String(rootNumber));
  }

  const childCounts = new Map<string, number>();
  for (const section of ordered) {
    if (!section.parent_id) continue;
    const parentNumber = rootNumbers.get(section.parent_id);
    if (!parentNumber) {
      numbers.set(section.id, null);
      continue;
    }
    const childNumber = (childCounts.get(section.parent_id) ?? 0) + 1;
    childCounts.set(section.parent_id, childNumber);
    numbers.set(section.id, `${parentNumber}.${childNumber}`);
  }

  return numbers;
}

export function displayTitle(title: string, number: string | null | undefined): string {
  return number ? `${number} ${title}` : title;
}